import { useState } from 'react'

function StarRating({ rating }) {
  return (
    <div className="stars" aria-label={`Rating: ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star
        const half   = !filled && rating >= star - 0.5
        return (
          <span
            key={star}
            className={`star ${filled ? 'star--full' : half ? 'star--half' : 'star--empty'}`}
          >
            ★
          </span>
        )
      })}
      <span className="stars__num">({rating})</span>
    </div>
  )
}

function ProductCard({ product, onAddToCart, cartQuantity }) {
  const { name, category, price, rating, stock, image, description } = product
  const [wished, setWished] = useState(false)
  const outOfStock = stock === 0

  return (
    <article className={`pc ${outOfStock ? 'pc--oos' : ''}`}>

      {/* ── Image ── */}
      <div className="pc__img-wrap">
        <img src={image} alt={name} className="pc__img" loading="lazy" />

        {/* Wishlist */}
        <button
          className={`pc__wish ${wished ? 'pc__wish--active' : ''}`}
          onClick={() => setWished(w => !w)}
          aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {wished ? '♥' : '♡'}
        </button>

        {/* Category pill */}
        <span className="pc__cat">{category}</span>

        {/* OOS overlay */}
        {outOfStock && <div className="pc__oos">Out of Stock</div>}

        {/* Low stock nudge */}
        {!outOfStock && stock <= 10 && (
          <span className="pc__low-stock">Only {stock} left</span>
        )}
      </div>

      {/* ── Body ── */}
      <div className="pc__body">
        <h3 className="pc__name">{name}</h3>
        <p  className="pc__desc">{description}</p>

        <StarRating rating={rating} />

        <div className="pc__footer">
          <span className="pc__price">${price.toFixed(2)}</span>

          <button
            className={`pc__btn ${cartQuantity > 0 ? 'pc__btn--added' : ''}`}
            onClick={() => onAddToCart(product)}
            disabled={outOfStock}
          >
            {outOfStock
              ? 'Unavailable'
              : cartQuantity > 0
              ? `✓ In Cart (${cartQuantity})`
              : '+ Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
