import { useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import booksData from '../data/books.json'
import ReactMarkdown from 'react-markdown'
import CollapseBox from '../components/SpoilerToggle'
import TableOfContents from '../components/TableOfContents'
export default function BookDetailPage() {
  const { id } = useParams()

  const [book, setBook] = useState(null)
  const [related, setRelated] = useState([])

  useEffect(() => {
    if (!id) return

    // find book safely
    const found = booksData.find(
      b => String(b.id).trim() === String(id).trim()
    )

    setBook(found || null)

    if (found) {
      const sameGenre = booksData
        .filter(
          b =>
            b.genre === found.genre &&
            b.id !== found.id
        )
        .slice(0, 4)

      setRelated(sameGenre)
    }
  }, [id])


  if (!book) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="font-serif text-2xl text-ink-900 mb-4">
          Không tìm thấy truyện
        </p>

        <Link
          to="/"
          className="text-bark-600 text-sm font-sans underline underline-offset-4"
        >
          ← Quay lại trang chủ
        </Link>
      </div>
    )
  }

  return (
    <main className="flex flex-col items-center justify-center max-w-6xl mx-auto px-12 py-12 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-md">

      {/* Breadcrumb */}
      <nav className="mb-10 text-xs font-sans text-bark-400 flex self-start gap-2">
        <Link to="/" className="hover:text-bark-600">
          Home
        </Link>
        <span>/</span>
        <span className="text-bark-600">
          {book.title}
        </span>
      </nav>

      {/* Detail */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-center">

        {/* Cover */}
        <div className="w-[300px]">
          <div
            className="aspect-[2/3]"
            style={{
              backgroundImage: `url(${book.cover})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <br />
          <h1 className="text-center font-serif text-2xl text-ink-800 font-semibold leading-tight mb-2">
            <ReactMarkdown>{book.title}</ReactMarkdown>

          </h1>

          <p className="text-center text-bark-600 font-sans mb-4">
            {book.author}
          </p>
        </div>

        {/* Info */}
        <div className="w-full md:max-w-md lg:max-w-lg">
          <div className="prose prose-neutral max-w-none mt-6 text-lg text-bark-600 text-justify ">
            <p className="text-center text-bark-800 font-serif mb-4 font-semibold text-3xl tracking-wide">
              GIỚI THIỆU:
            </p>
            <ReactMarkdown>
              {book.description}
            </ReactMarkdown>
          </div>

          {/* meta */}
          <div className="flex items-center gap-6 mt-6">

            <div>
              <p className="text-bark-400 text-xs">Tiến độ</p>
              <p className="font-serif text-lg text-ink-900">
                {book.chapters?.length || 0} / {book.total}
              </p>
            </div>

            <div className="w-px h-8 bg-cream-200" />

            <div>
              <p className="text-bark-400 text-xs">Thể loại</p>
              <p className="font-serif text-lg text-ink-900">
                {book.genre}
              </p>
            </div>

          </div>

        </div>

      </div>
      <br></br><br></br>
      {book.review?.trim() && (<div>
        <CollapseBox title="Lời đào hố viên">
          <div className="prose prose-neutral max-w-none prose-p:leading-7 space-y-4">
            <ReactMarkdown>{book.review}</ReactMarkdown>
          </div>
        </CollapseBox></div>
      )}

      <TableOfContents
        chapters={book.chapters}
        bookId={book.id}
      />

    </main>
  )
}