import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BookDetailPage from './pages/BookDetailPage'
import AboutPage from './pages/AboutPage'
import OrdersPage from './pages/OrdersPage'
import NotFoundPage from './pages/NotFoundPage'
import ProtectedRoute from './components/ProtectedRoute'
import AdminBooks from './pages/admin/Books'
import AdminUsers from './pages/admin/Users'
import AdminOrders from './pages/admin/Orders'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col" style={{
          backgroundImage: `url('bg1.png')`,
          backgroundRepeat: "repeat",
          backgroundSize: "300px"
        }}>
          <Navbar />
          <br></br>
          <div className="flex-1 "
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/orders" element={
                <ProtectedRoute><OrdersPage /></ProtectedRoute>
              } />
              <Route path="admin/books" element={
                <ProtectedRoute><AdminBooks /></ProtectedRoute>
              } />
              <Route path="admin/users" element={
                <ProtectedRoute><AdminUsers /></ProtectedRoute>
              } />
              <Route path="admin/orders" element={
                <ProtectedRoute><AdminOrders /></ProtectedRoute>
              } />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  )
}
