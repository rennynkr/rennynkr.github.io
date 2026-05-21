export default function FilterBar({ genres = [], query, setQuery, genre, setGenre, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
      <div className="flex flex-wrap gap-2">
        {genres.map(g => (
          <button
            key={g}
            onClick={() => setGenre(g)}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-medium transition-colors ${genre === g
              ? 'bg-bark-600 text-cream-50'
              : 'border border-cream-200 text-bark-600 hover:border-bark-400 hover:text-bark-800'
              }`}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <input
          type="text"
          placeholder="Tìm..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border border-cream-200 rounded-full px-5 py-2 text-sm font-sans text-ink-900 placeholder-bark-400 focus:outline-none focus:border-bark-400 bg-cream-50 w-44"
        />
      </div>
    </div>
  )
}
