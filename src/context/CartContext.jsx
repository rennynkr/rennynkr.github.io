import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(i => i.id === action.book.id)
      if (existing) {
        return state.map(i => i.id === action.book.id ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...state, { ...action.book, qty: 1 }]
    }
    case 'REMOVE':
      return state.filter(i => i.id !== action.id)
    case 'UPDATE_QTY':
      if (action.qty < 1) return state.filter(i => i.id !== action.id)
      return state.map(i => i.id === action.id ? { ...i, qty: action.qty } : i)
    case 'CLEAR':
      return []
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])

  const addToCart   = (book) => dispatch({ type: 'ADD', book })
  const removeFromCart = (id) => dispatch({ type: 'REMOVE', id })
  const updateQty   = (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty })
  const clearCart   = () => dispatch({ type: 'CLEAR' })

  const totalItems  = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice  = cart.reduce((s, i) => s + i.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
