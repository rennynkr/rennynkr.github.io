import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api'

export function useOrders() {
    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const [status, setStatus] = useState('All')

    const fetchOrders = useCallback(async () => {
        setLoading(true)
        setError(null)

        try {
            const params = {}
            if (status !== 'All') params.status = status

            const data = await api.ordersAdmin.list(params)

            setOrders(data.orders)
            setTotal(data.total)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [status])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    return {
        orders,
        total,
        loading,
        error,
        status, setStatus,
        refetch: fetchOrders
    }
}