/**
 * useCart — custom hook for cart state management.
 *
 * Demonstrates:
 *  - useState for holding cart items
 *  - useEffect for persisting cart to localStorage
 *  - Derived state (totalItems, totalPrice)
 *  - Pure update functions passed down as props (lifting state up)
 */
import { useState, useEffect } from 'react'

export function useCart() {
  // Initialise from localStorage so the cart survives a page refresh
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // Side-effect: keep localStorage in sync whenever cartItems changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  /** Add a product or increment its quantity if already in the cart */
  function addToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  /** Decrease quantity by 1, or remove the item if quantity reaches 0 */
  function removeFromCart(productId) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === productId)
      if (!existing) return prev
      if (existing.quantity === 1) {
        return prev.filter((item) => item.id !== productId)
      }
      return prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    })
  }

  /** Remove a product entirely regardless of quantity */
  function deleteFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  /** Empty the entire cart */
  function clearCart() {
    setCartItems([])
  }

  // Derived values — recomputed on every render
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return {
    cartItems,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    deleteFromCart,
    clearCart,
  }
}
