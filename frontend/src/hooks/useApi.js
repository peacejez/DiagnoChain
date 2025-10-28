import { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://127.0.0.1:5000'

export default function useApi() {
  const [loading, setLoading] = useState(false)

  async function post(path, body) {
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body || {})
      })
      return await res.json()
    } catch (e) {
      console.error(e)
      return null
    } finally {
      setLoading(false)
    }
  }

  return { post, loading }
}
