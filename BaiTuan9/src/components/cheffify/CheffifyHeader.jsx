import { Link, useLocation, useNavigate } from 'react-router-dom'
import cheffifyData from '../../data/cheffify.json'

export default function CheffifyHeader({ searchValue = '', onSearchChange }) {
  const navigate = useNavigate()
  const location = useLocation()
  const navRouteMap = {
    'What to cook': '/',
    Recipes: '/search',
    Ingredients: '/guide',
    Occasions: '/search',
    'About Us': '/subscribe',
  }

  const openSearchPage = () => {
    if (location.pathname !== '/search') {
      navigate('/search')
    }
  }

  return (
    <header className="chef-header">
      <Link className="chef-brand" to="/">{cheffifyData.brand}</Link>

      <div className="chef-search-wrap">
        <span className="search-icon">🔎</span>
        <input
          value={searchValue}
          onChange={onSearchChange}
          placeholder={cheffifyData.searchPlaceholder}
          onFocus={openSearchPage}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault()
              openSearchPage()
            }
          }}
        />
      </div>

      <nav>
        {cheffifyData.navItems.map((item) => (
          <Link key={item} to={navRouteMap[item] || '/'}>{item}</Link>
        ))}
      </nav>

      <div className="chef-actions">
        <button className="ghost" type="button" onClick={() => navigate('/auth-login')}>Login</button>
        <button className="solid" type="button" onClick={() => navigate('/subscribe')}>Subscribe</button>
      </div>
    </header>
  )
}
