import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

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
              UnorthodoZ
            </span>
          </Link>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <>
              <NavLink to="/about" className={({ isActive }) => `nav-underline text-sm font-sans transition-colors ${isActive ? 'text-ink-900 font-medium' : 'text-bark-600 hover:text-ink-900'}`}>
                Giới thiệu
              </NavLink>
            </>
          </nav>



        </div>
      </header>




    </>
  )
}