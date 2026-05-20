import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-cream-200 py-10 mt-16 bg-cream-50">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-serif italic text-ink-900 text-xl">UnorthodoZ</Link>
        <div className="flex gap-6">
          {['Chính sách', 'Quyền lợi', 'Liên hệ'].map(l => (
            <a key={l} href="#" className="text-bark-400 text-xs font-sans hover:text-bark-600 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}
