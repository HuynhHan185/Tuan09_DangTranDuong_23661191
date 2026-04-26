import { useMemo, useState } from 'react'
import AppImage from '../../components/common/AppImage'
import dashboardData from '../../data/adminDashboard.json'

export default function AdminDashboardPage() {
  const [activeMenu, setActiveMenu] = useState(dashboardData.sidebar[0])
  const [query, setQuery] = useState('')

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return dashboardData.report
    }

    return dashboardData.report.filter((item) => {
      return (
        item.name.toLowerCase().includes(q)
        || item.company.toLowerCase().includes(q)
        || item.status.toLowerCase().includes(q)
      )
    })
  }, [query])

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return dashboardData.projects
    }

    return dashboardData.projects.filter((item) => {
      return (
        item.name.toLowerCase().includes(q)
        || item.owner.toLowerCase().includes(q)
        || item.status.toLowerCase().includes(q)
      )
    })
  }, [query])

  const filteredTeamMembers = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return dashboardData.teamMembers
    }

    return dashboardData.teamMembers.filter((item) => {
      return (
        item.name.toLowerCase().includes(q)
        || item.role.toLowerCase().includes(q)
        || item.availability.toLowerCase().includes(q)
      )
    })
  }, [query])

  const filteredIntegrations = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return dashboardData.integrations
    }

    return dashboardData.integrations.filter((item) => {
      return (
        item.name.toLowerCase().includes(q)
        || item.category.toLowerCase().includes(q)
        || item.status.toLowerCase().includes(q)
      )
    })
  }, [query])

  const activeLowerSection = useMemo(() => {
    if (activeMenu === 'Projects') return 'projects'
    if (activeMenu === 'Teams') return 'teams'
    if (activeMenu === 'Integrations') return 'integrations'
    if (activeMenu === 'Analytics') return 'analytics'
    if (activeMenu === 'Messages') return 'activity'
    return 'all'
  }, [activeMenu])

  const exportData = () => {
    const blob = new Blob([JSON.stringify(filteredRows, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'report-export.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const importData = () => {
    window.alert('Demo import triggered. Connect this to backend/import parser in production.')
  }

  const statusClass = (value) => value.toLowerCase().replace(/\s+/g, '-')

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">{dashboardData.brand}</div>
        <nav>
          {dashboardData.sidebar.map((item) => (
            <button
              type="button"
              key={item}
              className={activeMenu === item ? 'active' : ''}
              onClick={() => setActiveMenu(item)}
            >
              {item}
            </button>
          ))}
        </nav>
        <div className="admin-card">
          <p>V2.0 is available</p>
          <button type="button" onClick={() => window.open('https://vite.dev', '_blank', 'noopener,noreferrer')}>Try now</button>
        </div>
      </aside>

      <main className="admin-main">
        <header>
          <h1>{activeMenu}</h1>
          <input placeholder={dashboardData.searchPlaceholder} value={query} onChange={(event) => setQuery(event.target.value)} />
        </header>

        <h2>Overview</h2>
        <section className="overview-grid">
          {dashboardData.overview.map((item) => (
            <article key={item.title} className={item.tone === 'pink' ? 'overview pink' : 'overview blue'}>
              <h3>{item.title}</h3>
              <strong>{item.value}</strong>
              <p>▲ {item.change} period of change</p>
            </article>
          ))}
        </section>

        <section className="report-block">
          <div className="report-head">
            <h2>Detailed report</h2>
            <div>
              <button type="button" onClick={importData}>Import</button>
              <button type="button" onClick={exportData}>Export</button>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Customer name</th>
                <th>Company</th>
                <th>Order value</th>
                <th>Order date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id}>
                  <td className="user-cell"><AppImage src={row.avatar} alt={row.name} />{row.name}</td>
                  <td>{row.company}</td>
                  <td>{row.value}</td>
                  <td>{row.date}</td>
                  <td><span className={`status ${row.status.toLowerCase()}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">{filteredRows.length} results - 1 2 3 4 ... 10 11</div>
        </section>

        <section className="admin-lower-grid">
          {(activeLowerSection === 'all' || activeLowerSection === 'projects' || activeLowerSection === 'analytics') ? (
            <article className="admin-widget">
              <div className="widget-head">
                <h3>Project Health</h3>
                <span>{filteredProjects.length} projects</span>
              </div>

              <div className="project-summary">
                <div><strong>{dashboardData.projectSummary.active}</strong><span>Active</span></div>
                <div><strong>{dashboardData.projectSummary.completedThisMonth}</strong><span>Done this month</span></div>
                <div><strong>{dashboardData.projectSummary.atRisk}</strong><span>At risk</span></div>
                <div><strong>{dashboardData.projectSummary.milestones}</strong><span>Milestones</span></div>
              </div>

              <div className="project-list">
                {filteredProjects.map((project) => (
                  <article key={project.id} className="project-card">
                    <div>
                      <h4>{project.name}</h4>
                      <p>{project.owner} · Due {project.deadline}</p>
                    </div>
                    <span className={`pill ${statusClass(project.status)}`}>{project.status}</span>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${project.progress}%` }} />
                    </div>
                    <small>{project.progress}% complete</small>
                  </article>
                ))}
              </div>
            </article>
          ) : null}

          {(activeLowerSection === 'all' || activeLowerSection === 'teams') ? (
            <article className="admin-widget">
              <div className="widget-head">
                <h3>Team Workload</h3>
                <span>{filteredTeamMembers.length} members</span>
              </div>

              <div className="team-list">
                {filteredTeamMembers.map((member) => (
                  <article key={member.id} className="team-card">
                    <AppImage src={member.avatar} alt={member.name} />
                    <div>
                      <h4>{member.name}</h4>
                      <p>{member.role}</p>
                    </div>
                    <div className="team-workload">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${member.workload}%` }} />
                      </div>
                      <small>{member.workload}% workload</small>
                    </div>
                    <span className={`pill ${statusClass(member.availability)}`}>{member.availability}</span>
                  </article>
                ))}
              </div>
            </article>
          ) : null}

          {(activeLowerSection === 'all' || activeLowerSection === 'integrations') ? (
            <article className="admin-widget">
              <div className="widget-head">
                <h3>Integrations</h3>
                <span>{filteredIntegrations.length} services</span>
              </div>

              <div className="integration-grid">
                {filteredIntegrations.map((integration) => (
                  <article key={integration.id} className="integration-card">
                    <h4>{integration.name}</h4>
                    <p>{integration.category}</p>
                    <span className={`pill ${statusClass(integration.status)}`}>{integration.status}</span>
                    <small>Uptime: {integration.uptime}</small>
                  </article>
                ))}
              </div>
            </article>
          ) : null}

          {(activeLowerSection === 'all' || activeLowerSection === 'activity' || activeLowerSection === 'analytics') ? (
            <article className="admin-widget">
              <div className="widget-head">
                <h3>Activity Feed</h3>
                <span>Last updates</span>
              </div>

              <div className="activity-list">
                {dashboardData.activityFeed.map((item) => (
                  <article key={item.id} className="activity-item">
                    <div>
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                    <small>{item.time}</small>
                  </article>
                ))}
              </div>
            </article>
          ) : null}
        </section>
      </main>
    </div>
  )
}
