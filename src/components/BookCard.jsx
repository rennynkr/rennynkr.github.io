import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

function StarRating({ rating }) {
  return (
    <span className="text-bark-600 text-xs font-sans tracking-wide">
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
      <span className="ml-1 text-bark-400">{rating}</span>
    </span>
  )
}

export default function BookCard({ book }) {
  const { addToCart } = useCart()

  return (
    <div className="group flex flex-col">
      {/* Cover */}
      <Link to={`/book/${book.id}`} className="block mb-4 w-full">
        <div
          className="book-hover relative shadow-lg overflow-hidden aspect-[2/3] w-full"
          style={{
            backgroundImage: book.cover_url ? `url(${book.cover_url})` : 'none',
            backgroundColor: book.cover_color || '#c9a87c',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2px 8px 8px 2px',
          }}
        >

          {book.cover_url && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent via-40%" />
          )}


          {/* Text on cover */}
          <div className="absolute inset-0 flex flex-col justify-between p-4 z-20">
            <span className="text-white text-[10px] font-sans font-medium tracking-widest uppercase opacity-90">
              {book.genre}
            </span>
            <div className="drop-shadow-lg">
              <p className="text-cream-100  font-serif font-bold text-sm md:text-base lg:text-lg leading-tight">
                {book.title}
              </p>
              <p className="text-cream-100/80 text-[11px] font-sans italic mt-1">
                {book.author}
              </p>
            </div>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        <StarRating rating={book.rating} />
        <p className="text-bark-400 text-xs font-sans mt-1">{book.pages} trang</p>
        <div className="flex items-center justify-between mt-3 mt-auto pt-3">
          <span className="font-serif text-lg text-ink-900">
            {Number(book.price).toLocaleString('vi-VN')}đ
          </span>
          <button
            onClick={() => {
              if (book.stock === 0) return
              addToCart(book)
            }}
            disabled={book.stock === 0}
            className={`
    text-xs font-sans font-medium px-4 py-2 rounded-full transition-colors duration-200
    ${book.stock === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-bark-600 text-cream-50 hover:bg-bark-800'}
  `}
          >
            {book.stock === 0 ? 'Hết hàng' : 'Thêm vào giỏ'}
          </button>
        </div>
      </div>
    </div>
  )
}
