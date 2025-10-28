import Landing from './pages/Landing.jsx'
import ConnectWallet from './pages/ConnectWallet.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'

import PatientDashboard from './pages/patient/Dashboard.jsx'
import SubmitSymptoms from './pages/patient/SubmitSymptoms.jsx'
import PredictionResult from './pages/patient/PredictionResult.jsx'
import Appointments from './pages/patient/Appointments.jsx'
import History from './pages/patient/History.jsx'

import DoctorDashboard from './pages/doctor/Dashboard.jsx'
import PatientDetail from './pages/doctor/PatientDetail.jsx'
import Approvals from './pages/doctor/Approvals.jsx'
import Schedule from './pages/doctor/Schedule.jsx'

export default [
  { path: '/', element: <Landing /> },
  { path: '/connect', element: <ConnectWallet /> },
  {
    path: '/patient',
    element: <DashboardLayout role="patient" />,
    children: [
      { index: true, element: <PatientDashboard /> },
      { path: 'submit', element: <SubmitSymptoms /> },
      { path: 'prediction/:id', element: <PredictionResult /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'history', element: <History /> }
    ]
  },
  {
    path: '/doctor',
    element: <DashboardLayout role="doctor" />,
    children: [
      { index: true, element: <DoctorDashboard /> },
      { path: 'approvals', element: <Approvals /> },
      { path: 'patients/:id', element: <PatientDetail /> },
      { path: 'schedule', element: <Schedule /> }
    ]
  }
]
