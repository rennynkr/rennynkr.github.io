import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div className="flex items-center justify-center py-32">
      <p className="text-bark-400 font-sans text-sm animate-pulse">Loading…</p>
    </div>
  )

  if (!user) return <Navigate to="/" replace />

  return children
}
