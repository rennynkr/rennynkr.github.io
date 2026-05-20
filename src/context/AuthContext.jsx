import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null)
  const [loading, setLoading] = useState(true)

  // Restore session on mount
  useEffect(() => {
    const token = localStorage.getItem('bookie_token')
    if (!token) { setLoading(false); return }
    api.auth.me()
      .then(setUser)
      .catch(() => localStorage.removeItem('bookie_token'))
      .finally(() => setLoading(false))
  }, [])

  async function login(email, password) {
    const data = await api.auth.login({ email, password })
    localStorage.setItem('bookie_token', data.token)
    setUser(data.user)
    return data.user
  }

  async function register(name, email, password) {
    const data = await api.auth.register({ name, email, password })
    localStorage.setItem('bookie_token', data.token)
    setUser(data.user)
    return data.user
  }

  function logout() {
    localStorage.removeItem('bookie_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
