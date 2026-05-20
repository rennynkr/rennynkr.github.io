import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { api } from '../lib/api'

export default function CartDrawer({ open, onClose, onAuthRequired }) {
  const { cart, removeFromCart, updateQty, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleCheckout() {
    if (!user) { onAuthRequired?.(); return }
    setLoading(true)
    setError(null)
    try {
      const items = cart.map(i => ({ book_id: i.id, qty: i.qty }))
      await api.orders.create(items)
      clearCart()
      onClose()
      navigate('/orders')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-black transition-opacity duration-300 ${open ? 'opacity-40 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div className={`fixed top-0 right-0 z-50 h-full w-80 bg-cream-50 shadow-2xl flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-cream-200">
          <h2 className="font-serif text-xl text-ink-900">Giỏ hàng</h2>
          <button onClick={onClose} className="text-bark-400 hover:text-bark-600 transition-colors text-lg leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-bark-400 font-sans text-sm">Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.map(item => (
                <li key={item.id} className="flex gap-4 items-start border-b border-cream-200 pb-5">
                  <div className="w-10 h-14 rounded-sm flex-shrink-0 shadow-md" style={{ background: item.cover_color || item.cover, borderRadius: '2px 4px 4px 2px' }} />
                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-sm text-ink-900 leading-tight truncate">{item.title}</p>
                    <p className="text-bark-400 text-xs font-sans mt-0.5">{item.author}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-cream-200 rounded-full">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 flex items-center justify-center text-bark-600 hover:text-ink-900 text-sm">−</button>
                        <span className="text-xs font-sans w-5 text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 flex items-center justify-center text-bark-600 hover:text-ink-900 text-sm">+</button>
                      </div>
                      <span className="text-bark-600 text-sm font-sans font-medium">{(item.price * item.qty).toLocaleString('vi-VN')}đ</span>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-bark-400 hover:text-bark-600 text-xs mt-0.5">✕</button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-cream-200 space-y-4">
            {error && <p className="text-red-600 text-xs font-sans bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
            <div className="flex justify-between items-center">
              <span className="text-bark-400 font-sans text-sm">Tổng</span>
              <span className="font-serif text-xl text-ink-900">{totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-bark-800 text-cream-50 font-sans text-sm font-medium py-3 rounded-full hover:bg-ink-900 transition-colors disabled:opacity-50"
            >
              {loading ? 'Đang tảir…' : user ? 'Thanh toán' : 'Đăng nhập để thanh toán'}
            </button>
            <button onClick={clearCart} className="w-full text-bark-400 font-sans text-xs hover:text-bark-600 transition-colors">Làm trống giỏ hàng</button>
          </div>
        )}
      </div>
    </>
  )
}
