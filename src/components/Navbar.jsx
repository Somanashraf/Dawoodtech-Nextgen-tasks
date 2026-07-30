/**
 * Navbar — top navigation bar.
 *
 * Props:
 *  - totalItems  {number}   Total products in the cart (badge count)
 *  - onCartClick {function} Opens/closes the cart sidebar
 *  - cartOpen    {boolean}  Whether the sidebar is currently open
 *
 * Concepts demonstrated:
 *  - Functional component receiving props
 *  - Conditional rendering (badge only when totalItems > 0)
 *  - JSX expressions and inline styles via className
 */
function Navbar({ totalItems, onCartClick, cartOpen }) {
  return (
    <header className="navbar">
      <div className="navbar__brand">
        <span className="navbar__logo">🛍️</span>
        <span className="navbar__title">ShopReact</span>
      </div>

      <nav className="navbar__links">
        <a href="#catalog" className="navbar__link">Catalog</a>
        <a href="#about"   className="navbar__link">About</a>
      </nav>

      <button
        className={`navbar__cart-btn ${cartOpen ? 'navbar__cart-btn--active' : ''}`}
        onClick={onCartClick}
        aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
      >
        🛒
        {/* Badge: only rendered when there is at least one item — conditional rendering */}
        {totalItems > 0 && (
          <span className="navbar__cart-badge">{totalItems}</span>
        )}
      </button>
    </header>
  )
}

export default Navbar
