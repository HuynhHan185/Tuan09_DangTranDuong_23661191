import { Link } from 'react-router-dom'

export default function CheffifyBreadcrumb({ items = [] }) {
  if (items.length === 0) {
    return null
  }

  return (
    <div className="chef-breadcrumb-bar">
      <nav className="chef-breadcrumb" aria-label="Breadcrumb">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          con
          return (
            <span key={`${item.label}-${index}`} className="crumb-item">
              {item.to && !isLast ? <Link to={item.to}>{item.label}</Link> : <span className="active">{item.label}</span>}
              {!isLast ? <span className="crumb-separator">›</span> : null}
            </span>
          )
        })}
      </nav>
    </div>
  )
}
