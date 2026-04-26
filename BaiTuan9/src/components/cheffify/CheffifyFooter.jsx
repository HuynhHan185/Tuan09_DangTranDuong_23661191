import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CheffifyFooter() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const onSend = () => {
    if (!email.includes('@')) {
      setMessage('Please enter a valid email.')
      return
    }

    setMessage('Subscribed successfully.')
    setEmail('')
  }

  return (
    <footer className="chef-footer">
      <div>
        <h4>About Us</h4>
        <p>Welcome to our website, a wonderful place to explore and learn how to cook like a pro.</p>
        <div className="footer-input">
          <input placeholder="Enter your email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <button type="button" onClick={onSend}>Send</button>
        </div>
        {message ? <small className="footer-note">{message}</small> : null}
      </div>

      <div>
        <h4>Learn More</h4>
        <p><button type="button" className="footer-link" onClick={() => navigate('/guide')}>Our Cooks</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>See Our Features</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/subscribe')}>FAQ</button></p>
        <h4>Shop</h4>
        <p><button type="button" className="footer-link" onClick={() => navigate('/subscribe')}>Gift Subscription</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/auth-preview')}>Send Us Feedback</button></p>
      </div>

      <div>
        <h4>Recipes</h4>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>What to Cook This Week</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Pasta</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Dinner</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Healthy</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Vegetarian</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Vegan</button></p>
        <p><button type="button" className="footer-link" onClick={() => navigate('/search')}>Christmas</button></p>
      </div>
    </footer>
  )
}
