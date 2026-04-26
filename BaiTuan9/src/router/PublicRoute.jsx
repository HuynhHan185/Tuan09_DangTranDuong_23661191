import { Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isAuthenticatedSelector } from '../state/authState'

export default function PublicRoute() {
  const isAuthenticated = useRecoilValue(isAuthenticatedSelector)

  if (isAuthenticated) {
    return <Navigate to="/app" replace />
  }

  return <Outlet />
}
