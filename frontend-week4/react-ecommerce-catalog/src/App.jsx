/**
 * App.jsx — Root component. Owns all shared state and wires every
 * child component together.
 *
 * React concepts demonstrated here:
 *  ✅ useState  – search query, selected category, sort order, cart sidebar toggle
 *  ✅ useEffect – simulate an API fetch with a loading state
 *  ✅ Lifting state up – filter/sort state lives here and is passed down as props
 *  ✅ Props flow  – every child receives only what it needs
 *  ✅ Custom hook – cart logic fully encapsulated in useCart()
 *  ✅ Derived state – filteredProducts computed from raw list + filters
 */
import { useState, useEffect } from 'react'

import Navbar       from './components/Navbar'
import SearchFilter from './components/SearchFilter'
import ProductList  from './components/ProductList'
import CartSidebar  from './components/CartSidebar'

import { useCart }              from './hooks/useCart'
import { products, CATEGORIES } from './data/products'

function App() {
  // ── Cart state (custom hook) ──────────────────────────────────────────────
  const {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
  } = useCart()

  // ── UI state ──────────────────────────────────────────────────────────────
  const [cartOpen, setCartOpen] = useState(false)

  // ── Filter / sort state (lifted up from SearchFilter) ────────────────────
  const [searchQuery,       setSearchQuery]       = useState('')
  const [selectedCategory,  setSelectedCategory]  = useState('All')
  const [sortBy,            setSortBy]            = useState('default')

  // ── Simulated loading state (useEffect demo) ─────────────────────────────
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate a 900 ms network request before showing products
    const timer = setTimeout(() => setLoading(false), 900)
    // Cleanup function — cancels the timer if the component unmounts early
    return () => clearTimeout(timer)
  }, []) // empty dep array → runs once on mount (componentDidMount equivalent)

  // ── Close cart when pressing Escape ──────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setCartOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // ── Prevent body scroll when cart sidebar is open ────────────────────────
  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [cartOpen])

  // ── Derived state: filter + sort ─────────────────────────────────────────
  const filteredProducts = products
    // 1. Category filter
    .filter((p) =>
      selectedCategory === 'All' ? true : p.category === selectedCategory
    )
    // 2. Search filter (case-insensitive match on name or description)
    .filter((p) => {
      const q = searchQuery.toLowerCase().trim()
      if (!q) return true
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      )
    })
    // 3. Sort
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':  return a.price  - b.price
        case 'price-desc': return b.price  - a.price
        case 'rating':     return b.rating - a.rating
        case 'name':       return a.name.localeCompare(b.name)
        default:           return 0 // keep original order
      }
    })

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="app">
      {/* ── Navbar receives cart count and toggle handler ── */}
      <Navbar
        totalItems={totalItems}
        onCartClick={() => setCartOpen((prev) => !prev)}
        cartOpen={cartOpen}
      />

      <main className="app__main" id="catalog">
        {/* ── Hero banner ── */}
        <section className="hero">
          <span className="hero__eyebrow">New Arrivals 2026</span>
          <h1 className="hero__title">
            Shop what you <span>actually</span> need
          </h1>
          <p className="hero__sub">
            {products.length} handpicked products across {CATEGORIES.length - 1} categories — electronics, clothing, books &amp; more.
          </p>
          <a href="#catalog-grid" className="hero__cta">
            Browse Catalog ↓
          </a>
        </section>

        {/* ── Search + filters (all state lifted up here) ── */}
        <div id="catalog-grid">
        <SearchFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={CATEGORIES}
          resultCount={filteredProducts.length}
        />

        </div>

        {/* ── Product grid ── */}
        <ProductList
          products={filteredProducts}
          onAddToCart={addToCart}
          cartItems={cartItems}
          loading={loading}
        />
      </main>

      {/* ── Cart sidebar (slide-in panel) ── */}
      <CartSidebar
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onRemove={removeFromCart}
        onDelete={deleteFromCart}
        onClear={clearCart}
      />

      <footer className="app__footer" id="about">
        <p>
          Built with <strong>React 18</strong> + <strong>Vite</strong> · Learning project by Muhammad Soman Ashraf
        </p>
      </footer>
    </div>
  )
}

export default App
