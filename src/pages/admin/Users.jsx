import { useState } from 'react'
import { api } from '../../lib/api'
import { useUsers } from '../../hooks/useUsers'

export default function AdminUsers() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingUser, setEditingUser] = useState(null)

    const {
        users, loading, error, refetch
    } = useUsers()

    const emptyForm = {
        name: '',
        email: '',
        password: '',
        role: 'customer'
    }

    const [formData, setFormData] = useState(emptyForm)

    // ================= EDIT =================
    const handleEdit = (user) => {
        setEditingUser(user)
        setFormData({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role: user.role || 'customer'
        })
        setIsModalOpen(true)
    }

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!window.confirm('Xác định xoá user này?')) return

        try {
            await api.users.delete(id)
            refetch()
        } catch (err) {
            alert('Lỗi xoá: ' + err.message)
        }
    }

    // ================= SUBMIT =================
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const payload = {
                name: formData.name,
                email: formData.email,
                role: formData.role
            }

            // chỉ gửi password nếu có nhập
            if (formData.password) {
                payload.password = formData.password
            }

            if (editingUser) {
                await api.users.update(editingUser.id, payload)
            } else {
                await api.users.create(payload)
            }

            setIsModalOpen(false)
            setEditingUser(null)
            setFormData(emptyForm)

            refetch()
        } catch (err) {
            alert('Lưu thất bại: ' + err.message)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8">
                <h1 className="font-serif text-3xl text-ink-900 italic font-bold bg-cream-50 rounded-full px-8 py-3 shadow-sm border-1 border-cream-200">Quản lý người dùng</h1>
                <button
                    onClick={() => {
                        setEditingUser(null)
                        setFormData(emptyForm)
                        setIsModalOpen(true)
                    }}
                    className="bg-ink-900 text-cream-50 px-6 py-2 rounded-full text-sm font-medium hover:bg-bark-600 shadow-md"
                >
                    + Thêm user
                </button>
            </div>

            <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full text-left table-auto border-collapse">
                    <thead className="bg-cream-50 border-b border-cream-200">
                        <tr>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold w-[30%]">Tên</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold w-[20%]">Email</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center w-[15%]">Vai trò</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center w-[15%]">Thời gian tạo</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-right w-[20%]">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-cream-100">
                        {loading && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400">Đang tải...</td>
                            </tr>
                        )}

                        {error && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-red-500">{error}</td>
                            </tr>
                        )}

                        {!loading && !error && users.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400 italic">
                                    Không có user nào
                                </td>
                            </tr>
                        )}

                        {!loading && !error && users.map(user => (
                            <tr key={user.id} className="hover:bg-cream-50/50">
                                <td className="px-6 py-4 font-medium text-bark-800">{user.name}</td>
                                <td className="px-6 py-4 text-sm text-bark-600">{user.email}</td>
                                <td className="px-6 py-4 text-center text-sm">
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold 
                    ${user.role === 'admin' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center text-xs text-bark-400">
                                    {new Date(user.created_at).toLocaleDateString("vi-vn")}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-bark-800 hover:text-blue-700 mr-4 text-sm font-bold"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-bark-800 hover:text-red-600 text-sm font-bold"
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
                        <h2 className="text-xl font-bold mb-4">
                            {editingUser ? 'Sửa user' : 'Thêm user'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Tên"
                                className="w-full p-3 border rounded-lg"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                required
                            />

                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-3 border rounded-lg"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                                required
                            />

                            <input
                                type="password"
                                placeholder={editingUser ? "Password (để trống nếu không đổi)" : "Password"}
                                className="w-full p-3 border rounded-lg"
                                value={formData.password}
                                onChange={e => setFormData({ ...formData, password: e.target.value })}
                            />

                            <select
                                className="w-full p-3 border rounded-lg"
                                value={formData.role}
                                onChange={e => setFormData({ ...formData, role: e.target.value })}
                            >
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)}>
                                    Huỷ
                                </button>
                                <button className="bg-black text-white px-6 py-2 rounded-lg">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}