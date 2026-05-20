import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

export function useUsers() {
    const [users, setUsers] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [query, setQuery] = useState('')
    const [role, setRole] = useState('All')
    const [page, setPage] = useState(1)

    const fetchUsers = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const params = { page, limit: 20 }

            if (query) params.q = query
            if (role !== 'All') params.role = role

            const data = await api.users.list(params)

            setUsers(data.users)
            setTotal(data.total)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [query, role, page])

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    return {
        users,
        total,
        loading,
        error,
        query, setQuery,
        role, setRole,
        page, setPage,
        refetch: fetchUsers
    }
}