# Dynamic API Explorer

A fully client-side JavaScript application that queries **4 public REST APIs** in real time, featuring advanced JS patterns, debounced search, dynamic filters, pagination, and robust error handling.

## Live Demo

> **[https://dynamic-api-explorer.vercel.app](https://dynamic-api-explorer.vercel.app)**

## GitHub Repository

> **[https://github.com/YOUR_USERNAME/dynamic-api-explorer](https://github.com/YOUR_USERNAME/dynamic-api-explorer)**

---

## Features

| Feature | Details |
|---|---|
| **4 Public APIs** | Countries, Pokémon, Jokes, Quotes |
| **Debounced Search** | 350ms debounce — no API spam |
| **Dynamic Filters** | Per-API filter chips (region, type, category, tag) |
| **Sorting** | Multiple sort options per API |
| **Pagination** | Smart ellipsis pagination, configurable page size |
| **Error Boundary** | Per-error type messages + retry button |
| **Retry Logic** | Exponential back-off with jitter (up to 3 retries) |
| **Request Cache** | Closure-based TTL cache (5–15 min per API) |
| **Loading Skeletons** | Shimmer placeholders while fetching |
| **Dark / Light Theme** | Persisted in localStorage |
| **Grid / List View** | Toggle between layouts |
| **Modal Detail** | Click any card for full detail view |
| **Toast Notifications** | Feedback for load success / errors |
| **Accessible** | Keyboard navigation, ARIA labels, focus management |

---

## Advanced JavaScript Concepts Used

### 1. Closures
```js
// createCache() — `store` Map is private state via closure
function createCache(ttlMs) {
  const store = new Map(); // private!
  return {
    get(key) { /* reads store */ },
    set(key, value) { /* writes store */ },
  };
}
```

### 2. Prototype-based Inheritance
```js
function BaseClient(baseURL) { this.baseURL = baseURL; }
BaseClient.prototype.get = function(endpoint) { /* ... */ };

function ApiClient(baseURL) { BaseClient.call(this, baseURL); }
ApiClient.prototype = Object.create(BaseClient.prototype); // prototype chain
```

### 3. Custom Error Classes
```js
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
  isNotFound()    { return this.statusCode === 404; }
  isRateLimited() { return this.statusCode === 429; }
}
```

### 4. Debouncing
```js
// Prevents API calls on every keystroke — waits 350ms after last input
const handleSearch = debounce((query) => {
  AppState.set('query', query);
  applyFiltersAndRender();
}, 350);
```

### 5. Throttling
```js
// Nav tab switching — at most once per 500ms
const handleNavClick = throttle((apiName) => {
  loadApi(apiName);
}, 500);
```

### 6. Memoization
```js
const fetchOnePokemon = memoize(async (name) => {
  return await pokeClient.get(`/pokemon/${name}`);
});
```

### 7. Module / IIFE Pattern
```js
const AppState = (() => {
  let _state = { /* private */ };
  return {
    get: (key) => _state[key],
    set: (key, val) => { _state[key] = val; },
  };
})();
```

### 8. HTTP Status Handling
```js
const HTTP_MESSAGES = {
  404: 'Not Found',
  429: 'Too Many Requests — rate limited',
  500: 'Internal Server Error',
  // ...
};
```

---

## APIs Used (Free, No Auth Required)

| API | Base URL | Data |
|---|---|---|
| REST Countries | `https://restcountries.com/v3.1` | Flags, population, languages |
| PokéAPI | `https://pokeapi.co/api/v2` | Gen 1 Pokémon stats |
| JokeAPI | `https://v2.jokeapi.dev` | Programming, pun, misc jokes |
| Quotable | `https://api.quotable.kurokeita.dev` | Famous quotes by author/tag |

---

## Project Structure

```
dynamic-api-explorer/
├── index.html                  # Single-page app shell
├── src/
│   ├── app.js                  # Main entry — wires all modules
│   ├── styles/
│   │   └── main.css            # Design system + all component styles
│   ├── utils/
│   │   ├── apiClient.js        # Generic HTTP client (closures + prototypes)
│   │   └── performance.js      # debounce, throttle, memoize, once, rateLimiter
│   ├── services/
│   │   └── apiService.js       # Domain-specific API methods + data normalizers
│   └── components/
│       ├── cards.js            # Card & modal HTML builders
│       ├── pagination.js       # Paginate logic + render function
│       └── toast.js            # Toast notification module
└── README.md
```

---

## Setup & Running Locally

### Prerequisites
- Any modern browser (Chrome 90+, Firefox 88+, Edge 90+)
- A local static file server (required for ES Modules)

### Option 1 — VS Code Live Server (Recommended)
```bash
# 1. Install "Live Server" extension in VS Code
# 2. Right-click index.html → "Open with Live Server"
```

### Option 2 — Node.js http-server
```bash
# Install once globally
npm install -g http-server

# Run from project folder
cd dynamic-api-explorer
http-server . -p 3000 --cors

# Open: http://localhost:3000
```

### Option 3 — Python
```bash
cd dynamic-api-explorer

# Python 3
python -m http.server 3000

# Open: http://localhost:3000
```

### Option 4 — npx serve
```bash
cd dynamic-api-explorer
npx serve .

# Open the URL shown in terminal
```

> **Note:** Do NOT open `index.html` directly via `file://` — ES Modules require HTTP.

---

## Deployment

### Deploy to Vercel (One command)
```bash
# Install Vercel CLI
npm install -g vercel

# From project root
vercel

# Follow prompts — it auto-detects a static site
# Your app will be live at: https://YOUR-PROJECT.vercel.app
```

### Deploy to Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `dynamic-api-explorer` folder onto the page
3. Done — live URL provided instantly

---

## Learning Outcomes

After building this project you will understand:

- **Closures** — private encapsulation without classes
- **Prototype chain** — memory-efficient method sharing
- **Custom errors** — rich, typed error handling
- **Debounce / Throttle** — UI performance optimization
- **Memoization** — avoiding redundant computation
- **HTTP status codes** — 200, 204, 400, 401, 404, 429, 500 and handling each
- **try/catch/finally** — structured async error boundaries
- **Retry with back-off** — resilient network requests
- **JSON parsing** — safe parsing with error guards
- **Event delegation** — efficient DOM event management
- **Module pattern** — scalable code organisation

---

## References

- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [MDN Prototype Chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [REST Countries API](https://restcountries.com/)
- [PokéAPI](https://pokeapi.co/)
- [JokeAPI](https://sv443.net/jokeapi/v2/)
- [Quotable API](https://github.com/lukePeavey/quotable)
