import { Link } from 'react-router-dom'
import BookCard from '../components/BookCard'
import FilterBar from '../components/FilterBar'
import { useBooks } from '../hooks/useBooks'

const heroColors = ['#9b7bb5', '#6b8cae', '#c9a87c']

export default function HomePage() {
  const {
    books, genres, total, loading, error,
    query, setQuery,
    genre, setGenre,
    sortBy, setSortBy,
  } = useBooks()

  return (
    <main>
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-8 md:py-12 flex flex-col md:flex-row items-start justify-center gap-12 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-md ">
        <div className="justify-center items-center">
          <p className="text-bark-400 text-xs font-sans tracking-widest uppercase mb-4">
            Gói trọn tinh hoa từ những trang sách
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-ink-900 leading-tight">
            Để những câu chuyện<br />
            <span className="italic text-bark-600 font-medium">dẫn lối đến trái tim.</span>
          </h1>
          <p className="text-bark-400 font-sans text-base mt-6 max-w-md leading-relaxed">
            Từ những tác phẩm văn học kinh điển đến hư cấu hiện đại,
            chúng mình tin rằng luôn có một cuốn sách đang chờ đợi bạn.
          </p>
          <div className="flex items-center gap-4 mt-15">
            <a href="#browse" className="bg-bark-600 text-cream-50 font-sans text-sm font-medium px-8 py-3 rounded-full hover:bg-bark-800 transition-all shadow-sm">
              Khám phá tủ sách
            </a>
            <a href="#browse" className="text-bark-600 font-sans text-sm underline underline-offset-8 hover:text-ink-900 transition-colors">
              Bán chạy tuần này →
            </a>
          </div>
        </div>

        <div className=" flex justify-center">
          <img
            src="/vit.png"
            alt="vit"
            className="h-[400px] w-auto"
          />
        </div>
      </section>
      <br></br>
      {/* Browse Section */}
      <section id="browse" className="max-w-6xl mx-auto px-9 py-8 pb-24 bg-cream-50 rounded-[50px] border-1 border-cream-200 shadow-sm">

        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl text-ink-900">Tất cả sách</h2>
          {!loading && <span className="text-bark-400 text-xs font-sans">{total} đầu sách</span>}
        </div>

        <FilterBar
          genres={genres}
          query={query} setQuery={setQuery}
          genre={genre} setGenre={setGenre}
          sortBy={sortBy} setSortBy={setSortBy}
        />

        {/* Trạng thái Loading */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-cream-200 rounded-md mb-4" style={{ height: 200 }} />
                <div className="bg-cream-200 h-3 rounded w-3/4 mb-2" />
                <div className="bg-cream-200 h-3 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* Trạng thái Lỗi */}
        {error && (
          <div className="text-center py-20">
            <p className="text-red-500 font-sans text-sm mb-2">Không thể tải danh sách sách.</p>
            <p className="text-bark-400 font-sans text-xs">{error}</p>
            <p className="text-bark-400 font-sans text-xs mt-1">Đảm bảo rằng backend đang chạy tại cổng 3001.</p>
          </div>
        )}

        {/* Trạng thái Trống */}
        {!loading && !error && books.length === 0 && (
          <p className="text-bark-400 font-sans text-sm py-16 text-center">Không tìm thấy cuốn sách nào khớp với tìm kiếm của bạn.</p>
        )}

        {/* Danh sách sách */}
        {!loading && !error && books.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
            {books.map(book => <BookCard key={book.id} book={book} />)}
          </div>
        )}
      </section>

    </main>
  )
}