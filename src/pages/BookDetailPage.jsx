import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'
import { api } from '../lib/api'

function StarRating({ rating }) {
  return (
    <span className="text-bark-600 text-sm font-sans">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="ml-1 text-bark-400">{rating} / 5</span>
    </span>
  )
}

export default function BookDetailPage() {
  const { id } = useParams()
  const { addToCart } = useCart()

  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    async function fetchData() {
      try {
        setLoading(true)

        const bookData = await api.books.get(id)
        setBook(bookData)

        const res = await api.books.list({
          genre: bookData.genre,
          limit: 4
        })

        const filtered = res.books.filter(b => b.id !== bookData.id)
        setRelated(filtered)

      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // loading
  if (loading) {
    return <div className="p-10 text-center">Đang tải...</div>
  }

  // not found
  if (!book) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-2xl text-ink-900 mb-4">Không tìm thấy.</p>
        <Link to="/" className="text-bark-600 text-sm font-sans underline underline-offset-4">← Trở về</Link>
      </div>
    )
  }

  return (
    <main className="max-w-6xl mx-auto px-12 py-12  bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-md ">
      {/* Breadcrumb */}
      <nav className="mb-10 text-xs font-sans text-bark-400 flex items-center gap-2">
        <Link to="/" className="hover:text-bark-600 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-bark-600">{book.title}</span>
      </nav>

      {/* Detail layout */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start justify-center">
        {/* Cover */}
        <div className="w-full md:w-auto flex">
          <div
            className="shadow-2xl relative aspect-[2/3] w-[240px]"
            style={{
              backgroundImage: `url(${book.cover_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              borderRadius: '2px 2px 2px 2px',
            }}
          >

          </div>
        </div>

        {/* Info */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <p className="text-bark-400 text-xs font-sans tracking-widest uppercase mb-2">{book.genre}</p>
          <h1 className="font-serif text-4xl text-ink-900 leading-tight mb-1">{book.title}</h1>
          <p className="text-bark-600 font-sans text-base mb-4">Tác giả: {book.author}</p>

          <StarRating rating={Number(book.rating)} />

          <p className="text-bark-600 font-sans text-sm mt-6 leading-relaxed max-w-lg">{book.description}</p>

          <div className="flex items-center gap-6 mt-6">
            <div>
              <p className="text-bark-400 text-xs font-sans">Số trang</p>
              <p className="text-ink-900 font-serif text-lg">{book.pages}</p>
            </div>
            <div className="w-px h-8 bg-cream-200" />
            <div>
              <p className="text-bark-400 text-xs font-sans">Thể loại</p>
              <p className="text-ink-900 font-serif text-lg">{book.genre}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <span className="font-serif text-3xl text-ink-900">
              {Number(book.price).toLocaleString('vi-VN')}đ
            </span>
            <button
              onClick={() => addToCart(book)}
              disabled={book.stock === 0}
              className={`font-sans text-sm font-medium px-8 py-3 rounded-full transition-colors
                ${book.stock === 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-bark-600 text-cream-50 hover:bg-bark-800'}`}
            >
              {book.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ hàng'}
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="font-serif text-2xl text-ink-900 mb-8">Sách cùng thể loại</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {related.map(b => (
              <Link key={b.id} to={`/book/${b.id}`} className="group flex flex-col">
                <div
                  className="book-hover relative shadow-lg overflow-hidden aspect-[2/3] w-[240px]"
                  style={{
                    backgroundImage: b.cover_url ? `url(${b.cover_url})` : 'none',
                    backgroundColor: b.cover_color || '#c9a87c',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '2px 8px 8px 2px',
                  }}
                >

                  {b.cover_url && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent via-40%" />
                  )}


                  {/* Text on cover */}
                  <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
                    <span className="text-white text-[10px] font-sans font-medium tracking-widest uppercase opacity-90">
                    </span>
                    <div className="drop-shadow-lg">
                      <p className="text-white font-serif font-bold text-sm md:text-base lg:text-lg leading-tight">
                        {b.title}
                      </p>
                      <p className="text-white/80 text-[11px] font-sans italic mt-1">
                        {b.author}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  )
}