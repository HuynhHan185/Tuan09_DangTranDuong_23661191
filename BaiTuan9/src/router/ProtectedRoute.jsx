import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedSelector } from '../state/authState'

export default function ProtectedRoute() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
