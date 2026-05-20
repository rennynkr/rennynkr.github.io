import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

export function useBooks() {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState(['All'])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('All')
  const [sortBy, setSortBy] = useState('default')
  const [page, setPage] = useState(1)

  useEffect(() => {
    api.books.genres().then(setGenres).catch(() => { })
  }, [])

  const fetchBooks = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params = { page, limit: 20 }
      if (genre !== 'All') params.genre = genre
      if (query) params.q = query
      if (sortBy !== 'default') params.sort = sortBy
      const data = await api.books.list(params)
      setBooks(data.books)
      setTotal(data.total)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [genre, query, sortBy, page])

  useEffect(() => {
    const t = setTimeout(fetchBooks, query ? 300 : 0)
    return () => clearTimeout(t)
  }, [fetchBooks, query])

  useEffect(() => { setPage(1) }, [genre, query, sortBy])

  return {
    books, genres, total, loading, error,
    query, setQuery,
    genre, setGenre,
    sortBy, setSortBy,
    page, setPage,
    refetch: fetchBooks
  }
}
