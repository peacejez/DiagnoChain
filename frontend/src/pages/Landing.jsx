import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()
  return (
    <div style={{minHeight:'100vh', background:'#1E3A5F', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'40px'}}>
      <h1 style={{fontSize:'48px', fontWeight:700}}>
        <span style={{color:'#fff'}}>D</span>
        <span style={{color:'#007BFF'}}>iagno</span>
        <span style={{color:'#fff'}}>Chain</span>
      </h1>
      <div style={{display:'flex', gap:'40px', flexWrap:'wrap', justifyContent:'center'}}>
        <button onClick={() => navigate('/patient')} style={cardStyle}>Patient</button>
        <button onClick={() => navigate('/doctor')} style={cardStyle}>Doctor</button>
      </div>
    </div>
  )
}
const cardStyle = {
  background:'#FF7A00', color:'#fff', border:'none', width:'220px', height:'220px',
  borderRadius:'24px', fontSize:'18px', fontWeight:600, cursor:'pointer',
  transition:'transform .2s', display:'flex', alignItems:'center', justifyContent:'center'
}
