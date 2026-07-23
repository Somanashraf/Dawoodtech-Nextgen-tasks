/**
 * performance.js
 * Debouncing, Throttling, and Memoization utilities.
 *
 * Concepts demonstrated:
 *  - Closures for private timer state
 *  - Higher-order functions
 *  - Memoization with Map cache
 */

// ─── Debounce ────────────────────────────────────────────────────────────────

/**
 * debounce(fn, wait, immediate?)
 *
 * Returns a debounced version of `fn` that delays execution until `wait` ms
 * after the last call. Ideal for search inputs — prevents flooding the API.
 *
 * CLOSURE: `timer` is private to each debounced function instance.
 *
 * @param {Function} fn
 * @param {number} wait - milliseconds to wait
 * @param {boolean} immediate - fire on leading edge instead of trailing
 */
export function debounce(fn, wait = 300, immediate = false) {
  let timer = null; // private state via closure

  function debounced(...args) {
    const context = this;

    const later = () => {
      timer = null;
      if (!immediate) fn.apply(context, args);
    };

    const callNow = immediate && !timer;
    clearTimeout(timer);
    timer = setTimeout(later, wait);
    if (callNow) fn.apply(context, args);
  }

  // Allow manual cancellation
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return debounced;
}

// ─── Throttle ────────────────────────────────────────────────────────────────

/**
 * throttle(fn, limit)
 *
 * Returns a throttled version of `fn` — guarantees it fires at most once
 * per `limit` ms. Ideal for scroll/resize events and button spam protection.
 *
 * CLOSURE: `lastRun` and `timer` are private per throttled instance.
 *
 * @param {Function} fn
 * @param {number} limit - minimum ms between executions
 */
export function throttle(fn, limit = 300) {
  let lastRun  = 0;
  let timer    = null;

  function throttled(...args) {
    const context = this;
    const now     = Date.now();
    const elapsed = now - lastRun;

    if (elapsed >= limit) {
      lastRun = now;
      fn.apply(context, args);
    } else {
      // Schedule trailing call so the last invocation always runs
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastRun = Date.now();
        fn.apply(context, args);
      }, limit - elapsed);
    }
  }

  throttled.cancel = () => {
    clearTimeout(timer);
    timer = null;
  };

  return throttled;
}

// ─── Memoize ─────────────────────────────────────────────────────────────────

/**
 * memoize(fn, keyResolver?)
 *
 * Caches results of pure functions. Returns cached result on repeat calls
 * with same arguments. Uses a Map for O(1) lookup.
 *
 * @param {Function} fn
 * @param {Function} keyResolver - custom cache key generator
 */
export function memoize(fn, keyResolver = (...args) => JSON.stringify(args)) {
  const cache = new Map();

  function memoized(...args) {
    const key = keyResolver(...args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  }

  memoized.cache  = cache;
  memoized.clear  = () => cache.clear();
  memoized.delete = (...args) => cache.delete(keyResolver(...args));

  return memoized;
}

// ─── Once ────────────────────────────────────────────────────────────────────

/**
 * once(fn)
 * Ensures `fn` is only ever called once regardless of how many times
 * the returned function is invoked.
 */
export function once(fn) {
  let called = false;
  let result;

  return function (...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// ─── Rate Limiter ────────────────────────────────────────────────────────────

/**
 * createRateLimiter(maxCalls, windowMs)
 *
 * Returns a function that tracks call count within a sliding window.
 * Returns true if the call is allowed, false if rate limit exceeded.
 *
 * CLOSURE: `calls` array is private state.
 */
export function createRateLimiter(maxCalls = 10, windowMs = 1000) {
  const calls = []; // timestamps of recent calls (closure)

  return {
    isAllowed() {
      const now    = Date.now();
      const cutoff = now - windowMs;

      // Remove calls outside the window
      while (calls.length && calls[0] < cutoff) calls.shift();

      if (calls.length < maxCalls) {
        calls.push(now);
        return true;
      }
      return false;
    },
    remaining() {
      const now    = Date.now();
      const cutoff = now - windowMs;
      while (calls.length && calls[0] < cutoff) calls.shift();
      return Math.max(0, maxCalls - calls.length);
    },
    reset() { calls.length = 0; },
  };
}
