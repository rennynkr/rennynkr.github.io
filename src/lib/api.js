const BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

function getToken() {
  return localStorage.getItem('bookie_token')
}

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`

  const res = await fetch(`${BASE}${path}`, { ...options, headers })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data
}

// Books
export const api = {
  books: {
    list: (params = {}) => request(`/books?${new URLSearchParams(params)}`),
    get: (id) => request(`/books/${id}`),
    genres: () => request('/books/genres'),
    create: (body) => request('/books', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/books/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (id) => request(`/books/${id}`, { method: 'DELETE' }),
  },
  auth: {
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request('/auth/me'),
  },
  orders: {
    create: (items) => request('/orders', { method: 'POST', body: JSON.stringify({ items }) }),
    list: () => request('/orders'),
    get: (id) => request(`/orders/${id}`),
  },
  ordersAdmin: {
    list: () => request('/admin/orders'),
    updateStatus: (id, status) =>
      request(`/admin/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      }),
  },
  users: {
    list: (params = {}) => request(`/users?${new URLSearchParams(params)}`),
    get: (id) => request(`/users/${id}`),
    create: (body) => request('/users', { method: 'POST', body: JSON.stringify(body) }),
    update: (id, body) => request(`/users/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (id) => request(`/users/${id}`, { method: 'DELETE' }),
  },
}
