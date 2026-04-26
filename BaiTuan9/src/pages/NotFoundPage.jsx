import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="screen center">
      <article className="card">
        <h2>404 - Khong tim thay trang</h2>
        <p className="muted">Duong dan ban truy cap khong ton tai.</p>
        <Link className="inline-link" to="/login">
          Ve trang dang nhap
        </Link>
      </article>
    </main>
  )
}
