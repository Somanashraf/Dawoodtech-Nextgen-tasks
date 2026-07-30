# React E-Commerce Catalog

A modular React 18 application built as part of the **Dawood Teck Internship – Frontend Week 4** learning task.  
It covers every core React fundamental: JSX, components, props, `useState`, `useEffect`, lifting state up, controlled form inputs, and custom hooks.

---

# Live Link
https://reactecommercecatalogue.vercel.app/

---

## Table of Contents

1. [Live Features](#live-features)
2. [Project Structure](#project-structure)
3. [Setup & Commands](#setup--commands)
4. [React Concepts Demonstrated](#react-concepts-demonstrated)
5. [Component Reference](#component-reference)
6. [Data Flow Diagram](#data-flow-diagram)
7. [Learning Outcomes](#learning-outcomes)

---

## Live Features

| Feature | Description |
|---|---|
| **Product Catalog** | 12 products across 4 categories rendered as cards |
| **Live Search** | Filters by product name, description, or category as you type |
| **Category Tabs** | One-click filtering by Electronics, Clothing, Books, Home & Garden |
| **Sort Controls** | Sort by price (asc/desc), top rating, or name A–Z |
| **Shopping Cart** | Add, remove, delete items with quantity tracking |
| **Cart Persistence** | Cart survives page refresh via `localStorage` |
| **Loading Skeleton** | Shimmer placeholder cards while data "loads" (900 ms simulated fetch) |
| **Responsive Layout** | Works on mobile, tablet, and desktop |
| **Keyboard Support** | Press `Escape` to close the cart sidebar |

---

## Project Structure

```
react-ecommerce-catalog/
├── index.html                  # Vite HTML entry point
├── vite.config.js              # Vite + React plugin config
├── package.json
└── src/
    ├── main.jsx                # ReactDOM.createRoot entry
    ├── App.jsx                 # Root component – owns all shared state
    ├── index.css               # Global design system (CSS custom properties)
    ├── data/
    │   └── products.js         # Static product array + CATEGORIES constant
    ├── hooks/
    │   └── useCart.js          # Custom hook – cart state + localStorage sync
    └── components/
        ├── Navbar.jsx          # Sticky header with cart badge
        ├── SearchFilter.jsx    # Controlled search input + category tabs + sort
        ├── ProductList.jsx     # Responsive grid + skeleton + empty state
        ├── ProductCard.jsx     # Individual product card with Add to Cart
        └── CartSidebar.jsx     # Slide-in cart panel with quantity controls
```

---

## Setup & Commands

### Prerequisites

- **Node.js** ≥ 18  →  [https://nodejs.org](https://nodejs.org)
- **npm** ≥ 9 (ships with Node)

### 1 — Install dependencies

```bash
cd react-ecommerce-catalog
npm install
```

### 2 — Start the development server

```bash
npm run dev
```

Vite starts at **http://localhost:5173** with Hot Module Replacement.  
The terminal will print the exact URL — open it in your browser.

### 3 — Production build

```bash
npm run build
```

Output is written to `dist/`. All assets are bundled and minified.

### 4 — Preview the production build locally

```bash
npm run preview
```

Serves the `dist/` folder at **http://localhost:4173** so you can test the final build before deploying.

---

## React Concepts Demonstrated

### JSX
Every `.jsx` file returns JSX — a syntax extension that lets you write HTML-like markup inside JavaScript. Vite's `@vitejs/plugin-react` transforms it to `React.createElement` calls at build time.

```jsx
// JSX in ProductCard.jsx
return (
  <article className="product-card">
    <img src={image} alt={name} />
    <h3>{name}</h3>
  </article>
)
```

### Components & Props
The app is split into five focused components. Each receives data and callbacks as **props** — plain JavaScript values passed from parent to child.

```jsx
// Parent passes data down as props
<ProductCard
  product={product}          // data prop
  onAddToCart={addToCart}    // callback prop
  cartQuantity={qty}         // derived data prop
/>
```

### useState
Used in `App.jsx` to track UI state. React re-renders the component (and its children) whenever state changes.

```jsx
const [searchQuery, setSearchQuery] = useState('')
const [cartOpen,    setCartOpen]    = useState(false)
```

### useEffect
Three effects in `App.jsx` cover real-world patterns:

| Effect | Dependency array | Purpose |
|---|---|---|
| Simulated fetch | `[]` | Runs once on mount → clears loading flag after 900 ms |
| Keyboard listener | `[]` | Adds/removes `keydown` listener; cleanup prevents memory leaks |
| Scroll lock | `[cartOpen]` | Locks `body` scroll while sidebar is open |

```jsx
useEffect(() => {
  const timer = setTimeout(() => setLoading(false), 900)
  return () => clearTimeout(timer)   // ← cleanup function
}, [])
```

### Lifting State Up
`searchQuery`, `selectedCategory`, and `sortBy` all live in `App.jsx` even though they are *changed* inside `SearchFilter`. The setter functions are passed down as props so `App` can compute `filteredProducts` from a single source of truth.

```
App (owns state)
 └── SearchFilter  ← receives value + onChange handler
 └── ProductList   ← receives already-filtered products
```

### Controlled Form Inputs
Every input in `SearchFilter` is a **controlled component**: React owns the value, not the DOM.

```jsx
<input
  value={searchQuery}                        // React controls the value
  onChange={(e) => onSearchChange(e.target.value)}  // every keystroke updates state
/>
```

### Custom Hook — useCart
All cart logic is extracted into `useCart.js` so `App.jsx` stays clean.  
The hook also demonstrates `useEffect` for **side-effects** (localStorage sync).

```js
// Inside useCart.js
useEffect(() => {
  localStorage.setItem('cart', JSON.stringify(cartItems))
}, [cartItems])   // re-runs whenever the cart changes
```

### Rendering Lists
`ProductList` maps over the filtered array and renders a `ProductCard` per item.  
The `key` prop lets React efficiently reconcile the list on updates.

```jsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} ... />
))}
```

### Conditional Rendering
Used throughout to show/hide UI elements based on state:

```jsx
{totalItems > 0 && <span className="navbar__cart-badge">{totalItems}</span>}

{loading ? <SkeletonCards /> : <ProductGrid />}

{cartItems.length === 0 ? <EmptyState /> : <ItemList />}
```

---

## Component Reference

### `<App />`
Root component. Owns `searchQuery`, `selectedCategory`, `sortBy`, `cartOpen`, and `loading`. Computes `filteredProducts` as derived state. Renders `Navbar`, `SearchFilter`, `ProductList`, and `CartSidebar`.

### `<Navbar totalItems onCartClick cartOpen />`
Sticky top bar with brand name and cart button. Shows a red badge with the item count when `totalItems > 0`.

### `<SearchFilter searchQuery onSearchChange selectedCategory onCategoryChange sortBy onSortChange categories resultCount />`
Fully controlled search box, category pill buttons, and a sort `<select>`. All state lives in the parent — this component only calls handler props.

### `<ProductList products onAddToCart cartItems loading />`
Renders the responsive CSS Grid. Shows skeleton cards while `loading` is true, an empty-state message when `products` is empty, or a `<ProductCard>` for each item.

### `<ProductCard product onAddToCart cartQuantity />`
Displays image, name, description, star rating, price, and Add to Cart button. Button label updates to "In Cart (n)" when the product is already in the cart.

### `<CartSidebar isOpen onClose cartItems totalPrice totalItems onRemove onDelete onClear />`
Slide-in panel from the right. Lists each cart item with quantity controls, shows the running total, and provides Checkout / Clear Cart actions. Clicking the backdrop or pressing Escape closes it.

### `useCart()` hook
Returns `{ cartItems, totalItems, totalPrice, addToCart, removeFromCart, deleteFromCart, clearCart }`. Persists state to `localStorage` via `useEffect`.

---

## Data Flow Diagram

```
App.jsx  (single source of truth)
│
├── state: searchQuery, selectedCategory, sortBy  ──► filteredProducts (derived)
├── state: cartOpen
├── useCart() hook → cartItems, totalItems, totalPrice
│
├── <Navbar>
│     props: totalItems, onCartClick, cartOpen
│
├── <SearchFilter>
│     props: searchQuery, onSearchChange,
│            selectedCategory, onCategoryChange,
│            sortBy, onSortChange,
│            categories, resultCount
│
├── <ProductList>
│     props: products (filtered+sorted), onAddToCart, cartItems, loading
│     └── <ProductCard> × N
│           props: product, onAddToCart, cartQuantity
│
└── <CartSidebar>
      props: isOpen, onClose, cartItems, totalPrice,
             totalItems, onRemove, onDelete, onClear
```

---

## Learning Outcomes

After completing this project you will be able to:

- Build a React app from scratch using **Vite**
- Break a UI into **reusable, single-responsibility components**
- Pass data and behaviour between components using **props**
- Manage local UI state with **useState**
- Run side-effects (data fetching, subscriptions, DOM mutations) with **useEffect** and understand cleanup functions
- Apply the **lifting state up** pattern to share state across sibling components
- Build **controlled form inputs** that are always in sync with React state
- Extract reusable stateful logic into **custom hooks**
- Render dynamic lists efficiently with `.map()` and the `key` prop
- Use **conditional rendering** to show different UI based on state

---

*Project by **Muhammad Soman Ashraf** · Dawood Teck Internship · Frontend Week 4 · July 2026*
