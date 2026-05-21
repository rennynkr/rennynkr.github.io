import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
function StarRating({ rating = 0 }) {
  return (
    <span className="text-bark-600 text-xs font-sans tracking-wide">
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
      <span className="ml-1 text-bark-400">{rating}</span>
    </span>
  )
}

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="group flex flex-col">

      {/* Cover */}
      <div className="block mb-4 w-full">
        <div
          className="book-hover relative shadow-lg overflow-hidden aspect-[2/3] w-full"
          style={{
            backgroundImage: book.cover ? `url(${book.cover})` : 'none',
            backgroundColor: '#c9a87c',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '2px 8px 8px 2px',
          }}
        >

        </div>
      </div>

      {/* Info (JSON-only) */}
      <div className="flex flex-col flex-1">
        <p className="font-serif text-xl text-center text-ink-900 font-semibold">
          <ReactMarkdown>{book.title}</ReactMarkdown>
        </p>
        <p className="text-bark-400 text-md text-center font-sans mt-1">
          Tiến độ: {book.chapters?.length || 0} / {book.total} chương
        </p>
      </div>
    </Link>
  )
}