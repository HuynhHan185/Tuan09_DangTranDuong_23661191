import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import CheffifyBreadcrumb from '../../components/cheffify/CheffifyBreadcrumb'
import CheffifyHeader from '../../components/cheffify/CheffifyHeader'
import data from '../../data/cheffify.json'
import { searchQueryAtom } from '../../state/uiState'

export default function AuthLoginPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useRecoilState(searchQueryAtom)
  const [email, setEmail] = useState('')
  const [authMessage, setAuthMessage] = useState('')

  const continueLogin = () => {
    if (!email.includes('@')) {
      setAuthMessage('Please enter a valid email.')
      return
    }
    setAuthMessage('Login link sent to your email.')
    navigate('/')
  }

  const socialLogin = (provider) => {
    setAuthMessage(`Continuing with ${provider}...`)
    navigate('/')
  }

  return (
    <div className="chef-page auth-preview-page">
      <CheffifyHeader
        searchValue={searchQuery}
        onSearchChange={(event) => setSearchQuery(event.target.value)}
      />

      <CheffifyBreadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Login' },
        ]}
      />

      <section className="auth-bg" style={{ backgroundImage: `url(${data.hero.backgroundImage})` }}>
        <article className="login-modal">
          <div className="left-img" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1000&auto=format&fit=crop)" }}>
            <h3>"Embrace the art of cooking, where flavors come alive!"</h3>
          </div>
          <div className="right-form">
            <button type="button" className="close-btn" onClick={() => navigate('/')}>✕</button>
            <h2>Login</h2>
            <p>Enter your email to log in.</p>
            <input placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button type="button" className="primary" onClick={continueLogin}>Continue</button>
            <div className="or-line">OR</div>
            <button type="button" className="social" onClick={() => socialLogin('Google')}>Continue with Google</button>
            <button type="button" className="social" onClick={() => socialLogin('Facebook')}>Continue with Facebook</button>
            <button type="button" className="social" onClick={() => socialLogin('Apple')}>Continue with Apple</button>
            {authMessage ? <p className="tiny-note">{authMessage}</p> : null}
          </div>
        </article>
      </section>
    </div>
  )
}
