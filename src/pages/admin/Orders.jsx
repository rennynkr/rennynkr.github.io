import { useState } from 'react'
import { useOrders } from '../../hooks/useOrders'
import { api } from '../../lib/api'

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

export default function AdminOrders() {
    const {
        orders, loading, error,
        status, setStatus,
        refetch
    } = useOrders()

    const [selectedOrderId, setSelectedOrderId] = useState(null)

    // ================= UPDATE STATUS =================
    const handleUpdateStatus = async (id, newStatus) => {
        try {
            await api.ordersAdmin.updateStatus(id, newStatus)
            refetch()
        } catch (err) {
            alert('Lỗi cập nhật: ' + err.message)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl text-ink-900 italic font-bold bg-cream-50 rounded-full px-8 py-3 shadow-sm border border-cream-200">
                    Quản lý đơn hàng
                </h1>
            </div>

            {/* TABLE */}
            <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left table-auto border-collapse">

                    {/* HEAD */}
                    <thead className="bg-cream-50 border-b border-cream-200">
                        <tr>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold">ID</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold">Khách hàng</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center">Trạng thái</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center">Tổng tiền</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center">Ngày</th>
                        </tr>
                    </thead>

                    {/* BODY */}
                    <tbody className="divide-y divide-cream-100">

                        {loading && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400">
                                    Đang tải...
                                </td>
                            </tr>
                        )}

                        {error && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-red-500">
                                    {error}
                                </td>
                            </tr>
                        )}

                        {!loading && !error && orders.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400 italic">
                                    Không có đơn hàng
                                </td>
                            </tr>
                        )}

                        {!loading && !error && orders.map(order => (
                            <tr
                                key={order.id}
                                onClick={() =>
                                    setSelectedOrderId(
                                        selectedOrderId === order.id ? null : order.id
                                    )
                                }
                                className={`cursor-pointer align-top 
                  ${selectedOrderId === order.id ? 'bg-cream-100' : 'hover:bg-cream-50/50'}
                `}
                            >
                                {/* ID */}
                                <td className="px-6 py-4 text-sm  font-medium text-bark-600">
                                    #{order.id}
                                </td>

                                {/* USER */}
                                <td className="px-6 py-4 text-sm text-bark-600 font-medium truncate max-w-[250px]">
                                    {order.user_name || 'Ẩn danh'}
                                </td>

                                {/* STATUS */}
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[order.status]}`}>
                                        {STATUS_LABELS[order.status]}
                                    </span>
                                </td>

                                {/* TOTAL */}
                                <td className="px-6 py-4 text-center font-medium">
                                    {Number(order.total_price).toLocaleString('vi-VN')}đ
                                </td>

                                {/* DATE */}
                                <td className="px-6 py-4 text-center text-xs text-bark-400">
                                    {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>

            {/* ORDER DETAILS */}
            <div className="mt-10 space-y-6">
                {!loading && !error && orders.map(order => (
                    selectedOrderId === order.id && (
                        <div key={order.id} className="border border-cream-200 rounded-2xl p-6 bg-cream-50 shadow-sm">

                            {/* HEADER */}
                            <div className="flex justify-between mb-4">
                                <div>
                                    <p className="font-serif text-lg">Đơn #{order.id}</p>
                                    <p className="text-xs text-bark-400">
                                        {new Date(order.created_at).toLocaleDateString('vi-VN')}
                                    </p>
                                </div>

                                <span className={`px-3 py-3 rounded-full text-center text-xs font-bold border ${STATUS_STYLES[order.status]}`}>
                                    {STATUS_LABELS[order.status]}
                                </span>
                            </div>

                            {/* ITEMS */}
                            <ul className="border-t pt-4 space-y-2">
                                {order.items?.map((item, i) => (
                                    <li key={i} className="flex justify-between text-sm">
                                        <span>{item.title}</span>
                                        <span>
                                            x{item.qty} · {(item.unit_price * item.qty).toLocaleString('vi-VN')}đ
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            {/* UPDATE STATUS */}
                            <div className="mt-6 flex items-center gap-3">
                                <span className="text-sm text-bark-400">Cập nhật trạng thái:</span>

                                <select
                                    value={order.status}
                                    onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                    className="px-3 py-2 border rounded-lg text-sm"
                                >
                                    <option value="pending">Chờ xử lý</option>
                                    <option value="paid">Đã thanh toán</option>
                                    <option value="shipped">Đang giao</option>
                                    <option value="delivered">Đã giao</option>
                                    <option value="cancelled">Đã huỷ</option>
                                </select>
                            </div>

                        </div>
                    )
                ))}
            </div>

        </div>
    )
}