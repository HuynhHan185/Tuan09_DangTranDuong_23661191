import { lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from '../pages/AppLayout'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const TasksPage = lazy(() => import('../pages/TasksPage'))
const ProfilePage = lazy(() => import('../pages/ProfilePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))

const HomePage = lazy(() => import('../pages/cheffify/HomePage'))
const SearchPage = lazy(() => import('../pages/cheffify/SearchPage'))
const SearchEmptyPage = lazy(() => import('../pages/cheffify/SearchEmptyPage'))
const RecipeBoxPage = lazy(() => import('../pages/cheffify/RecipeBoxPage'))
const SubscribePage = lazy(() => import('../pages/cheffify/SubscribePage'))
const GuidePage = lazy(() => import('../pages/cheffify/GuidePage'))
const AuthPreviewPage = lazy(() => import('../pages/cheffify/AuthPreviewPage'))
const AuthLoginPage = lazy(() => import('../pages/cheffify/AuthLoginPage'))
const AdminDashboardPage = lazy(() => import('../pages/cheffify/AdminDashboardPage'))

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Route>

      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/search-empty" element={<SearchEmptyPage />} />
      <Route path="/recipe-box" element={<RecipeBoxPage />} />
      <Route path="/subscribe" element={<SubscribePage />} />
      <Route path="/guide" element={<GuidePage />} />
      <Route path="/auth-preview" element={<AuthPreviewPage />} />
      <Route path="/auth-login" element={<AuthLoginPage />} />
      <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
      <Route path="/dashboard" element={<Navigate to="/app" replace />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
