import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { authStateAtom, currentUserSelector } from '../state/authState'

export default function AppLayout() {
  const navigate = useNavigate()
  const user = useRecoilValue(currentUserSelector)
  const setAuth = useSetRecoilState(authStateAtom)

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null })
    navigate('/login', { replace: true })
  }

  return (
    <div className="screen">
      <header className="topbar">
        <div>
          <h2>Task Workspace</h2>
          <p className="muted">Xin chao, {user?.displayName || 'user'}.</p>
        </div>
        <button type="button" onClick={logout}>Dang xuat</button>
      </header>

      <nav className="tabs">
        <NavLink to="/app" end>
          Dashboard
        </NavLink>
        <NavLink to="/app/tasks">Tasks</NavLink>
        <NavLink to="/app/profile">Profile</NavLink>
      </nav>

      <section className="content">
        <Outlet />
      </section>
    </div>
  )
}
