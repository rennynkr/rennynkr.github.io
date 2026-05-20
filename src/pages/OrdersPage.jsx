import { useEffect, useState } from 'react'
import { api } from '../lib/api'
import { Link } from 'react-router-dom'

const STATUS_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  paid: 'bg-blue-50 text-blue-700 border-blue-200',
  shipped: 'bg-purple-50 text-purple-700 border-purple-200',
  delivered: 'bg-green-50 text-green-700 border-green-200',
  cancelled: 'bg-red-50 text-red-700 border-red-200',
}

const STATUS_LABELS = {
  pending: 'Chờ xử lý',
  paid: 'Đã thanh toán',
  shipped: 'Đang giao',
  delivered: 'Đã giao',
  cancelled: 'Đã huỷ',
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedOrderId, setSelectedOrderId] = useState(null)
  const [orderDetails, setOrderDetails] = useState({})

  // ================= LOAD LIST =================
  useEffect(() => {
    api.orders.list()
      .then(data => {
        setOrders(Array.isArray(data) ? data : [])
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // ================= LOAD DETAIL =================
  const handleSelectOrder = async (id) => {
    if (selectedOrderId === id) {
      setSelectedOrderId(null)
      return
    }

    setSelectedOrderId(id)

    if (orderDetails[id]) return

    try {
      const detail = await api.orders.get(id)
      setOrderDetails(prev => ({
        ...prev,
        [id]: detail
      }))
    } catch (err) {
      alert('Không thể tải chi tiết đơn hàng')
    }
  }

  // ================= UI =================
  if (loading) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-24 text-center">
        <p className="text-bark-400 text-sm animate-pulse">Đang tải đơn hàng...</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-8 py-10 bg-cream-50 rounded-[40px] border border-cream-200 shadow-sm">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="font-serif text-3xl text-ink-900">
          Đơn hàng của bạn
        </h1>
      </div>

      {/* ERROR */}
      {error && (
        <p className="text-red-600 text-sm mb-6">
          {error}
        </p>
      )}

      {/* EMPTY */}
      {!orders || orders.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-serif text-xl text-ink-900 mb-3">
            Bạn chưa có đơn hàng nào
          </p>

          <Link
            to="/"
            className="bg-bark-600 text-cream-50 px-6 py-3 rounded-full text-sm hover:bg-bark-800"
          >
            Mua sách ngay
          </Link>
        </div>
      ) : (

        <div className="space-y-4">

          {orders.map(order => (
            <div key={order.id} className="border border-cream-200 rounded-2xl overflow-hidden">

              {/* HEADER ROW */}
              <div
                onClick={() => handleSelectOrder(order.id)}
                className="flex justify-between items-center p-5 cursor-pointer hover:bg-cream-100 transition"
              >
                <div>
                  <p className="font-medium text-ink-900">
                    Đơn #{order.id}
                  </p>
                  <p className="text-xs text-bark-400">
                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                  </p>
                </div>

                <div className="flex items-center gap-4">

                  {/* STATUS */}
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[order.status]}`}>
                    {STATUS_LABELS[order.status]}
                  </span>

                  {/* TOTAL */}
                  <span className="font-medium text-ink-900">
                    {Number(order.total_price).toLocaleString('vi-VN')}đ
                  </span>

                </div>
              </div>

              {/* DETAIL */}
              {selectedOrderId === order.id && (
                <div className="border-t border-cream-200 p-5  bg-cream-50">

                  {!orderDetails[order.id] ? (
                    <p className="text-sm text-bark-400">Đang tải chi tiết...</p>
                  ) : (
                    <ul className="space-y-2">
                      {orderDetails[order.id].items?.map((item, i) => (
                        <li key={i} className="flex justify-between text-sm">
                          <span>{item.title}</span>
                          <span className="text-bark-400">
                            x{item.qty} · {(item.unit_price * item.qty).toLocaleString('vi-VN')}đ
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </main>
  )
}