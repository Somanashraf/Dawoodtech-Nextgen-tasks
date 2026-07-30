/**
 * ProductList — renders the filtered/sorted grid of ProductCards.
 *
 * Props:
 *  - products      {object[]}  Already-filtered and sorted product array
 *  - onAddToCart   {function}  Passed down to each ProductCard
 *  - cartItems     {object[]}  Used to compute per-product cart quantities
 *  - loading       {boolean}   Show skeleton cards while data loads
 *
 * Concepts demonstrated:
 *  - Rendering lists with .map() and key prop
 *  - Props drilling
 *  - Conditional rendering (empty state, loading skeleton)
 */
import ProductCard from './ProductCard'

// Simple skeleton placeholder shown while products are loading
function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__img" />
      <div className="skeleton-card__line skeleton-card__line--title" />
      <div className="skeleton-card__line skeleton-card__line--desc"  />
      <div className="skeleton-card__line skeleton-card__line--desc"  />
      <div className="skeleton-card__line skeleton-card__line--short" />
    </div>
  )
}

function ProductList({ products, onAddToCart, cartItems, loading }) {
  // Build a quick lookup: productId → quantity in cart
  const quantityMap = cartItems.reduce((acc, item) => {
    acc[item.id] = item.quantity
    return acc
  }, {})

  if (loading) {
    return (
      <div className="product-list">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="product-list__empty">
        <p className="product-list__empty-icon">🔎</p>
        <h2>No products found</h2>
        <p>Try adjusting your search or filters.</p>
      </div>
    )
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          cartQuantity={quantityMap[product.id] ?? 0}
        />
      ))}
    </div>
  )
}

export default ProductList
