import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-32 text-center">
      <p className="font-serif text-8xl text-cream-200 select-none">404</p>
      <h1 className="font-serif text-3xl text-ink-900 -mt-4 mb-4">Không tìm thấy trang này</h1>
      <p className="text-bark-400 font-sans text-sm mb-8">
        Vịt con đi lạc mất rồi :(
      </p>
      <Link
        to="/"
        className="bg-bark-600 text-cream-50 font-sans text-sm font-medium px-8 py-3 rounded-full hover:bg-bark-800 transition-colors"
      >
        Trở về trang chủ
      </Link>
    </main>
  )
}
