import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import CartDrawer from './CartDrawer'
import AuthModal from './AuthModal'

export default function Navbar() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [cartOpen, setCartOpen] = useState(false)
  const [authOpen, setAuthOpen] = useState(false)


  const isAdmin = user?.role === 'admin'


  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-cream-50 border-b border-cream-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

          {/* Logo & Admin Tag */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/vit.png"
              alt="vit"
              className="h-[44px] w-auto"
            />
            <span className="font-serif text-2xl text-ink-900 italic font-bold transition-colors group-hover:text-bark-600">
              Tiệm sách của Vịt
            </span>
            {isAdmin && (
              <span className="text-[10px] bg-bark-600 text-cream-50 px-2 py-0.5 rounded-full uppercase tracking-widest font-bold shadow-sm">
                Quản trị
              </span>
            )}
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {user && isAdmin ? (
              /* GIAO DIỆN ADMIN */
              <>
                <NavLink to="/admin/books" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                  Kho sách
                </NavLink>
                <NavLink to="/admin/users" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                  Khách hàng
                </NavLink>
                <NavLink to="/admin/orders" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                  Đơn hàng
                </NavLink>
              </>
            ) : (
              /* GIAO DIỆN KHÁCH */
              <>
                <NavLink to="/" end className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                  Cửa hàng
                </NavLink>

                {user && (
                  <NavLink to="/orders" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                    Lịch sử mua hàng
                  </NavLink>
                )}

                <NavLink to="/about" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                  Giới thiệu
                </NavLink>
              </>
            )}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-ink-900 text-xs font-medium font-sans italic">
                    Chào, {user.name || "Bạn"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="text-bark-400 text-[10px] font-sans hover:text-bark-600 transition-colors underline underline-offset-4 uppercase tracking-tighter"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setAuthOpen(true)}
                className="text-bark-600 text-sm font-sans hover:text-ink-900 transition-colors font-medium"
              >
                Đăng nhập
              </button>
            )}

            {/* Giỏ hàng */}
            {!isAdmin && (
              <button
                onClick={() => setCartOpen(true)}
                className="relative flex items-center gap-2 text-ink-900 text-sm font-sans hover:text-bark-600 transition-colors group"
                aria-label="Mở giỏ hàng"
              >
                <div className="relative">
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 01-8 0" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-bark-600 text-cream-50 text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold ring-2 ring-cream-50">
                      {totalItems}
                    </span>
                  )}
                </div>
                <span className="hidden sm:inline">Giỏ hàng</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Side Panels */}
      {!isAdmin && (
        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onAuthRequired={() => {
            setCartOpen(false)
            setAuthOpen(true)
          }}
        />
      )}

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  )
}