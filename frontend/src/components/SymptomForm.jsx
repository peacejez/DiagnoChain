import { useState } from 'react'
import useApi from '../hooks/useApi.js'

export default function SymptomForm({ onResult }) {
  const [symptoms, setSymptoms] = useState('')
  const { post, loading } = useApi()

  async function handleSubmit(e) {
    e.preventDefault()
    const res = await post('/predict', { symptoms })
    onResult?.(res?.predictions || [])
  }

  return (
    <form onSubmit={handleSubmit} style={{display:'grid', gap:'12px'}}>
      <textarea value={symptoms} onChange={e=>setSymptoms(e.target.value)} placeholder="e.g., leg pain, back pain, muscle pain" rows={4} style={{padding:'12px', borderRadius:'8px', border:'1px solid #e5e7eb'}}/>
      <button disabled={loading} style={{padding:'10px 14px', borderRadius:'8px', background:'#0f766e', color:'#fff', border:'none'}}>
        {loading ? 'Predicting...' : 'Predict Disease'}
      </button>
    </form>
  )
}
