import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function AuthModal({ open, onClose }) {
  const { login, register } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  function update(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError(null)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.name, form.email, form.password)
      }
      onClose()
    } catch (err) {
      setError(err.message === 'Request failed' ? 'Đã có lỗi xảy ra, vui lòng thử lại.' : err.message)
    } finally {
      setLoading(false)
    }
  }

  function switchMode() {
    setMode(m => m === 'login' ? 'register' : 'login')
    setError(null)
    setForm({ name: '', email: '', password: '' })
  }

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-colors duration-300 bg-ink-900/40 backdrop-blur-sm "

        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-cream-50 rounded-2xl shadow-2xl w-full max-w-sm pointer-events-auto p-8">

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl text-ink-900">
                {mode === 'login' ? 'Mừng bạn trở lại' : 'Tạo tài khoản mới'}
              </h2>
              <p className="text-bark-400 font-sans text-sm mt-1">
                {mode === 'login'
                  ? 'Đăng nhập vào Tiệm sách của Vịt.'
                  : 'Trở thành một phần của cộng đồng yêu sách.'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-bark-400 hover:text-bark-600 transition-colors text-lg leading-none mt-1"
            >✕</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-bark-400 text-xs font-sans uppercase tracking-widest block mb-1.5">
                  Họ và tên
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  required
                  placeholder="Đỗ Vịt"
                  className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-sans text-ink-900 placeholder:italic placeholder:opacity-50 placeholder:text-bark-400 focus:outline-none focus:border-bark-400 bg-cream-50"
                />
              </div>
            )}

            <div>
              <label className="text-bark-400 text-xs font-sans uppercase tracking-widest block mb-1.5">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                required
                placeholder="motconvit@email.com"
                className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-sans text-ink-900 placeholder:italic placeholder:opacity-50 placeholder:text-bark-400 focus:outline-none focus:border-bark-400 bg-cream-50"
              />
            </div>

            <div>
              <label className="text-bark-400 text-xs font-sans uppercase tracking-widest block mb-1.5">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={update}
                required
                minLength={8}
                placeholder="Tối thiểu 8 ký tự"
                className="w-full border border-cream-200 rounded-xl px-4 py-2.5 text-sm font-sans text-ink-900 placeholder:italic placeholder:opacity-50 placeholder:text-bark-400 focus:outline-none focus:border-bark-400 bg-cream-50"
              />
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-600 text-xs font-sans bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-bark-600 text-cream-50 font-sans text-sm font-medium py-3 rounded-full hover:bg-bark-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? 'Đang xử lý...'
                : mode === 'login' ? 'Đăng nhập' : 'Đăng ký tài khoản'}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-bark-400 text-xs font-sans mt-5">
            {mode === 'login' ? "Bạn chưa có tài khoản? " : 'Bạn đã có tài khoản? '}
            <button
              onClick={switchMode}
              className="text-bark-600 underline underline-offset-2 hover:text-ink-900 transition-colors"
            >
              {mode === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
            </button>
          </p>

        </div>
      </div>
    </>
  )
}