export default function PredictionCard({ item }) {
  if (!item) return null
  return (
    <div style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'12px'}}>
      <div style={{fontWeight:600}}>{item.disease}</div>
      <div style={{color:'#475569'}}>{item.probability}%</div>
    </div>
  )
}
