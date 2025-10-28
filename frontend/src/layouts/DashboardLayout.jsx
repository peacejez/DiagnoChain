import { Outlet, NavLink } from 'react-router-dom'

export default function DashboardLayout({ role }) {
  const links = role === 'patient'
    ? [
        { to: '/patient', label: 'Dashboard' },
        { to: '/patient/submit', label: 'Submit Symptoms' },
        { to: '/patient/appointments', label: 'Appointments' },
        { to: '/patient/history', label: 'History' }
      ]
    : [
        { to: '/doctor', label: 'Dashboard' },
        { to: '/doctor/approvals', label: 'Approvals' },
        { to: '/doctor/schedule', label: 'Schedule' }
      ]

  return (
    <div style={{minHeight:'100vh', display:'grid', gridTemplateColumns:'240px 1fr'}}>
      <aside style={{borderRight:'1px solid #e5e7eb', padding:'16px'}}>
        <div style={{fontWeight:600, marginBottom:'16px'}}>DiagnoChain</div>
        <nav style={{display:'flex', flexDirection:'column', gap:'8px'}}>
          {links.map(l => (
            <NavLink key={l.to} to={l.to} className={({isActive}) =>
              `nav-link ${isActive ? 'active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>
        <style>{`
          .nav-link { padding: 8px 12px; border-radius: 8px; }
          .nav-link:hover { background:#f3f4f6; }
          .nav-link.active { background:#111827; color:#fff; }
        `}</style>
      </aside>
      <main className="container">
        <Outlet />
      </main>
    </div>
  )
}
