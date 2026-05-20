import { useMemo, useState } from 'react'
import BookCard from '../components/BookCard'
import FilterBar from '../components/FilterBar'
import booksData from '../data/books.json'

export default function HomePage() {
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('all')
  const [sortBy, setSortBy] = useState('title')

  // filter + sort từ JSON
  const books = useMemo(() => {
    let result = [...booksData]

    // search
    if (query) {
      result = result.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase())
      )
    }

    // genre
    if (genre !== 'all') {
      result = result.filter(b => b.genre === genre)
    }

    // sort
    if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [query, genre, sortBy])

  // genres từ JSON
  const genres = useMemo(() => {
    return ['all', ...new Set(booksData.map(b => b.genre))]
  }, [])

  const total = books.length

  return (
    <main>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-start justify-center gap-12 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-md">
        <div className="flex flex-col items-center text-center">
          <h1 className="font-serif text-5xl md:text-6xl text-ink-900 leading-tight">
            Tui viết cái web này<br />
            <span className="italic text-bark-600 font-medium">
              vì tui phô mô :D
            </span>
          </h1>
          <p className="text-bark-400 font-sans text-base mt-6 max-w-md leading-relaxed">
            Lóy chung là chỗ để tui up chiện bê đê
          </p>
        </div>
      </section>

      <br />

      {/* Browse Section */}
      <section
        id="browse"
        className="max-w-6xl mx-auto px-9 py-8 pb-24 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-sm"
      >

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-ink-900">Tất cả sách</h2>
        </div>

        {/* Filter */}
        <FilterBar
          genres={genres}
          query={query}
          setQuery={setQuery}
          genre={genre}
          setGenre={setGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {/* Empty state */}
        {books.length === 0 && (
          <p className="text-bark-400 font-sans text-sm py-16 text-center">
            Không tìm thấy cuốn sách nào khớp với tìm kiếm của bạn.
          </p>
        )}

        {/* Grid */}
        {books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

    </main>
  )
}