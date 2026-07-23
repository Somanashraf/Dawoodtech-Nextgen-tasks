/**
 * apiClient.js
 * Advanced API Client using Closures, Prototype-based inheritance,
 * retry logic, HTTP status handling, and request caching.
 *
 * Concepts demonstrated:
 *  - Closure for private state (cache, config)
 *  - Prototype chain via Object.create
 *  - Custom error classes extending Error
 *  - Exponential back-off retry with jitter
 *  - JSON parsing with error boundaries
 */

// ─── Custom Error Classes ────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(message, statusCode, data = null) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.data = data;
    this.timestamp = new Date().toISOString();

    // Maintains proper stack trace (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  isClientError() { return this.statusCode >= 400 && this.statusCode < 500; }
  isServerError() { return this.statusCode >= 500; }
  isNotFound()    { return this.statusCode === 404; }
  isRateLimited() { return this.statusCode === 429; }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      timestamp: this.timestamp,
    };
  }
}

export class NetworkError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(ms) {
    super(`Request timed out after ${ms}ms`);
    this.name = 'TimeoutError';
  }
}

// ─── HTTP Status Code Map ────────────────────────────────────────────────────

const HTTP_MESSAGES = {
  200: 'OK',
  201: 'Created',
  204: 'No Content',
  400: 'Bad Request – check your query parameters.',
  401: 'Unauthorized – authentication required.',
  403: 'Forbidden – you don\'t have permission.',
  404: 'Not Found – the resource does not exist.',
  408: 'Request Timeout – server took too long to respond.',
  429: 'Too Many Requests – you are being rate limited.',
  500: 'Internal Server Error – something broke on the server.',
  502: 'Bad Gateway – upstream server error.',
  503: 'Service Unavailable – the API is temporarily down.',
  504: 'Gateway Timeout – server did not respond in time.',
};

export function getHttpMessage(status) {
  return HTTP_MESSAGES[status] || `HTTP Error ${status}`;
}

// ─── Request Cache (Closure-based) ──────────────────────────────────────────

/**
 * createCache() — demonstrates CLOSURE pattern.
 * The `store` map is private; only exposed via the returned API.
 */
function createCache(ttlMs = 5 * 60 * 1000) {
  const store = new Map(); // private via closure

  return {
    get(key) {
      const entry = store.get(key);
      if (!entry) return null;
      if (Date.now() - entry.time > ttlMs) {
        store.delete(key);
        return null;
      }
      return entry.value;
    },
    set(key, value) {
      store.set(key, { value, time: Date.now() });
    },
    delete(key) { store.delete(key); },
    clear()     { store.clear(); },
    size()      { return store.size; },
  };
}

// ─── Base HTTP Client (Prototype pattern) ───────────────────────────────────

/**
 * BaseClient — constructor function used with Object.create for prototype chain.
 * Shows PROTOTYPE-BASED inheritance without ES6 class sugar.
 */
function BaseClient(baseURL, options = {}) {
  this.baseURL  = baseURL.replace(/\/$/, '');
  this.timeout  = options.timeout  || 10000;
  this.retries  = options.retries  || 3;
  // No Content-Type on GET — avoids CORS preflight on public APIs
  this.headers  = options.headers  || {};
  this._cache   = createCache(options.cacheTTL || 5 * 60 * 1000);
}

// Prototype methods — shared across all instances (memory efficient)
BaseClient.prototype._buildURL = function (endpoint, params = {}) {
  const url = new URL(endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== '') {
      url.searchParams.set(k, v);
    }
  });
  return url.toString();
};

BaseClient.prototype._parseJSON = function (text) {
  try {
    return JSON.parse(text);
  } catch {
    throw new ApiError('Invalid JSON response from server.', 0);
  }
};

BaseClient.prototype._shouldRetry = function (error, attempt) {
  if (attempt >= this.retries) return false;
  if (error instanceof TimeoutError)  return true;
  if (error instanceof NetworkError)  return true;
  if (error instanceof ApiError && error.isServerError()) return true;
  if (error instanceof ApiError && error.isRateLimited()) return true;
  return false;
};

/**
 * Exponential back-off with jitter.
 * delay = min(base * 2^attempt + random(0..1000), maxDelay)
 */
BaseClient.prototype._backoff = function (attempt) {
  const base     = 200;   // 200ms base
  const maxDelay = 3000;  // max 3 sec
  const jitter   = Math.random() * 300;
  return Math.min(base * Math.pow(2, attempt) + jitter, maxDelay);
};

BaseClient.prototype._fetchWithTimeout = function (url, options) {
  const controller = new AbortController();
  const timerId    = setTimeout(() => controller.abort(), this.timeout);

  return fetch(url, { ...options, signal: controller.signal })
    .then((response) => {
      clearTimeout(timerId);
      return response;
    })
    .catch((err) => {
      clearTimeout(timerId);
      console.error('[ApiClient] Fetch failed:', url, err.name, err.message);
      if (err.name === 'AbortError') throw new TimeoutError(this.timeout);
      throw new NetworkError(`Network error: ${err.message}`);
    });
};

BaseClient.prototype.request = async function (method, endpoint, { params = {}, body = null, useCache = true } = {}) {
  const url      = this._buildURL(endpoint, params);
  const cacheKey = `${method}:${url}`;

  // Return cached GET responses
  if (method === 'GET' && useCache) {
    const cached = this._cache.get(cacheKey);
    if (cached) return cached;
  }

  const fetchOptions = {
    method,
    headers: this.headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  let attempt = 0;

  while (true) {
    try {
      const response = await this._fetchWithTimeout(url, fetchOptions);
      const text     = await response.text();

      if (!response.ok) {
        const message = getHttpMessage(response.status);
        let errorData = null;
        try { errorData = JSON.parse(text); } catch { /* ignore */ }
        throw new ApiError(message, response.status, errorData);
      }

      // Handle 204 No Content
      if (response.status === 204 || !text) return null;

      const data = this._parseJSON(text);

      // Cache successful GET responses
      if (method === 'GET' && useCache) {
        this._cache.set(cacheKey, data);
      }

      return data;

    } catch (err) {
      if (this._shouldRetry(err, attempt)) {
        const delay = this._backoff(attempt);
        console.warn(`[ApiClient] Attempt ${attempt + 1} failed. Retrying in ${Math.round(delay)}ms…`, err.message);
        await new Promise((res) => setTimeout(res, delay));
        attempt++;
      } else {
        throw err;
      }
    }
  }
};

BaseClient.prototype.get  = function (endpoint, params, opts) {
  return this.request('GET', endpoint, { params, ...(opts || {}) });
};

BaseClient.prototype.clearCache = function () {
  this._cache.clear();
};

// ─── ApiClient — inherits BaseClient via Object.create ──────────────────────

function ApiClient(baseURL, options = {}) {
  BaseClient.call(this, baseURL, options); // call parent constructor
}

// Set up prototype chain
ApiClient.prototype = Object.create(BaseClient.prototype);
ApiClient.prototype.constructor = ApiClient;

// Export factory function (FACTORY PATTERN)
export function createApiClient(baseURL, options = {}) {
  return new ApiClient(baseURL, options);
}

export default ApiClient;
