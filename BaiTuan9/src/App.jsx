import { Suspense } from 'react'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <Suspense fallback={<main className="screen center">Dang tai trang...</main>}>
      <AppRouter />
    </Suspense>
  )
}

export default App
