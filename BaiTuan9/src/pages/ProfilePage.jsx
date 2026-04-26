import { useRecoilValue } from 'recoil'
import { currentUserSelector } from '../state/authState'

export default function ProfilePage() {
  const user = useRecoilValue(currentUserSelector)

  return (
    <article className="card">
      <h3>Thong tin tai khoan</h3>
      <p>Email: {user?.email}</p>
      <p>Display name: {user?.displayName}</p>
      <p>Muc dich: minh hoa global state auth va nested protected routes.</p>
    </article>
  )
}
