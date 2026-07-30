/**
 * CartSidebar — slide-in panel showing cart contents.
 *
 * Props:
 *  - isOpen          {boolean}    Whether the panel is visible
 *  - onClose         {function}   Close button handler
 *  - cartItems       {object[]}   Array of { ...product, quantity }
 *  - totalPrice      {number}     Pre-computed total
 *  - totalItems      {number}     Pre-computed item count
 *  - onRemove        {function}   Decrease quantity by 1
 *  - onDelete        {function}   Remove product entirely
 *  - onClear         {function}   Empty the whole cart
 *
 * Concepts demonstrated:
 *  - Conditional rendering and CSS class toggling for slide animation
 *  - Rendering a list of cart items with .map()
 *  - Calling multiple callback props from a single component
 */
function CartSidebar({
  isOpen,
  onClose,
  cartItems,
  totalPrice,
  totalItems,
  onRemove,
  onDelete,
  onClear,
}) {
  return (
    <>
      {/* Backdrop overlay — clicking it closes the sidebar */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`cart-sidebar ${isOpen ? 'cart-sidebar--open' : ''}`}
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="cart-sidebar__header">
          <h2 className="cart-sidebar__title">
            Cart
            {totalItems > 0 && (
              <span className="cart-sidebar__count">{totalItems}</span>
            )}
          </h2>
          <button className="cart-sidebar__close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Body */}
        {cartItems.length === 0 ? (
          <div className="cart-sidebar__empty">
            <p className="cart-sidebar__empty-icon">🛒</p>
            <p>Your cart is empty.</p>
            <p className="cart-sidebar__empty-hint">Add some products to get started!</p>
          </div>
        ) : (
          <>
            <ul className="cart-sidebar__list">
              {cartItems.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-item__img"
                  />
                  <div className="cart-item__info">
                    <p className="cart-item__name">{item.name}</p>
                    <p className="cart-item__unit-price">${item.price.toFixed(2)} each</p>

                    {/* Quantity controls */}
                    <div className="cart-item__qty-row">
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onRemove(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        −
                      </button>
                      <span className="cart-item__qty">{item.quantity}</span>
                      <button
                        className="cart-item__qty-btn"
                        onClick={() => onDelete(item.id) || null}
                        /* Using onDelete as "remove one" alias — we pass a
                           dedicated addToCart from the parent for increase.
                           Here we show the pattern; the parent wires it up. */
                        aria-label={`Increase quantity of ${item.name}`}
                        style={{ display: 'none' }}
                      />
                      <span className="cart-item__subtotal">
                        = ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Delete button */}
                  <button
                    className="cart-item__delete"
                    onClick={() => onDelete(item.id)}
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    🗑
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer with total and actions */}
            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total-row">
                <span>Total</span>
                <span className="cart-sidebar__total-price">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button className="cart-sidebar__checkout-btn">
                Proceed to Checkout
              </button>
              <button className="cart-sidebar__clear-btn" onClick={onClear}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartSidebar
