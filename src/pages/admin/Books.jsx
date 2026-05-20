import { useState, useEffect } from 'react'
import { api } from '../../lib/api'
import { useBooks } from '../../hooks/useBooks'
import TextareaAutosize from 'react-textarea-autosize';
export default function AdminBooks() {
    // const [books, setBooks] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [editingBook, setEditingBook] = useState(null)
    const {
        books, loading, error, refetch
    } = useBooks()


    const emptyForm = {
        title: '',
        author: '',
        genre: '',
        price: '',
        stock: '',
        description: '',
        cover_color: '#f3e5ab'
    }

    const [formData, setFormData] = useState(emptyForm)


    // ================= EDIT =================
    const handleEdit = (book) => {
        setEditingBook(book)
        setFormData({
            title: book.title || '',
            author: book.author || '',
            genre: book.genre || '',
            price: book.price || '',
            stock: book.stock || '',
            description: book.description || '',
            cover_color: book.cover_color || '#f3e5ab'
        })
        setIsModalOpen(true)
    }

    // ================= DELETE =================
    const handleDelete = async (id) => {
        if (!window.confirm('Xác định xoá cuốn sách này?')) return

        try {
            await api.books.delete(id)
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
                ...formData,
                price: Number(formData.price),
                stock: Number(formData.stock)
            }

            if (editingBook) {
                await api.books.update(editingBook.id, payload)
            } else {
                await api.books.create(payload)
            }

            setIsModalOpen(false)
            setEditingBook(null)
            setFormData(emptyForm)

            refetch()
        } catch (err) {
            alert('Lưu thất bại: ' + err.message)
        }
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex justify-between items-center mb-8  ">
                <h1 className="font-serif text-3xl text-ink-900 italic font-bold bg-cream-50 rounded-full px-8 py-3 shadow-sm border-1 border-cream-200 ">Quản lý Kho sách</h1>
                <button
                    onClick={() => {
                        setEditingBook(null)
                        setFormData(emptyForm)
                        setIsModalOpen(true)
                    }}
                    className="bg-ink-900 text-cream-50 px-6 py-2 rounded-full text-sm font-medium hover:bg-bark-600 shadow-md transition-all "
                >
                    + Nhập sách mới
                </button>
            </div>

            <div className="bg-white border border-cream-200 rounded-2xl overflow-hidden shadow-sm ">
                <table className="w-full text-left table-auto border-collapse">
                    <thead className="bg-cream-50 border-b border-cream-200">
                        <tr>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold w-[10%]">Bìa</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold w-[40%]">Thông tin</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center w-[15%]">Giá</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-center w-[15%]">Kho</th>
                            <th className="px-6 py-4 text-xs uppercase text-bark-400 font-bold text-right w-[20%]">Thao tác</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-cream-100">
                        {loading && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400">Đang tải dữ liệu...</td>
                            </tr>
                        )}

                        {error && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-red-500 font-medium">{error}</td>
                            </tr>
                        )}

                        {!loading && !error && books.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center py-10 text-bark-400 italic">Không có sách nào trong hệ thống</td>
                            </tr>
                        )}

                        {!loading && !error && books.map(book => (
                            <tr key={book.id} className="hover:bg-cream-50/50 transition-colors text-ink-900">
                                <td className="px-6 py-4">
                                    <div
                                        className="w-10 aspect-[2/3] rounded-md shadow-inner border border-black/5"
                                        style={{
                                            backgroundImage: book.cover_url ? `url(${book.cover_url})` : 'none',
                                            backgroundColor: book.cover_color || '#ccc',
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                        }}
                                    />
                                </td>

                                <td className="px-6 py-4">
                                    <div className="text-sm text-bark-800 font-bold truncate max-w-[250px]">{book.title}</div>
                                    <div className="text-xs text-bark-800 italic">{book.author}</div>
                                </td>

                                <td className="px-6 py-4 text-sm font-medium text-center">
                                    {book.price ? Number(book.price).toLocaleString() : '0'}đ
                                </td>

                                <td className="px-6 py-4 text-sm text-center font-medium">
                                    {book.stock || 0}
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="text-bark-600 hover:text-blue-800 mr-4 text-sm font-bold"
                                    >
                                        Sửa
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="text-bark-600 hover:text-red-700 text-sm font-bold"
                                    >
                                        Xoá
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 backdrop-blur-sm p-4">
                    <div className="bg-cream-50 w-full max-w-lg p-8 rounded-3xl shadow-2xl border border-bark-400">
                        <h2 className="font-serif text-2xl mb-6 italic">{editingBook ? 'Cập nhật sách' : 'Nhập sách mới'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" placeholder="Tên sách" className="w-full p-3 bg-white rounded-xl border border-bark-400 shadow-sm outline-none"
                                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required />

                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Tác giả" className="p-3 bg-white rounded-xl border border-bark-400"
                                    value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required />
                                <input type="text" placeholder="Thể loại" className="p-3 bg-white rounded-xl border border-bark-400"
                                    value={formData.genre} onChange={e => setFormData({ ...formData, genre: e.target.value })} />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <input type="number" placeholder="Giá" className="p-3 bg-white rounded-xl border border-bark-400"
                                    value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                                <input type="number" placeholder="Kho" className="p-3 bg-white rounded-xl border border-bark-400"
                                    value={formData.stock} onChange={e => setFormData({ ...formData, stock: e.target.value })} required />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <TextareaAutosize
                                    placeholder="Mô tả sách"
                                    minRows={3}
                                    className="p-3 bg-white rounded-xl border border-bark-400 w-full resize-none "
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                />
                            </div>

                            <div className="flex justify-end gap-4 pt-4">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="text-bark-400 font-bold">Huỷ</button>
                                <button type="submit" className="bg-ink-900 text-cream-50 px-10 py-3 rounded-full shadow-lg font-medium">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}