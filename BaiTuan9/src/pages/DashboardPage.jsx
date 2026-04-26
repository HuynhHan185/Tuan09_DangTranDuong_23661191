import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { taskStatsSelector } from '../state/taskState'

export default function DashboardPage() {
  const stats = useRecoilValue(taskStatsSelector)

  const completionRate = useMemo(() => {
    if (stats.total === 0) {
      return 0
    }

    return Math.round((stats.done / stats.total) * 100)
  }, [stats.done, stats.total])

  return (
    <div className="grid-3">
      <article className="card stat-card">
        <h3>Tong task</h3>
        <strong>{stats.total}</strong>
      </article>
      <article className="card stat-card">
        <h3>Hoan thanh</h3>
        <strong>{stats.done}</strong>
      </article>
      <article className="card stat-card">
        <h3>Ti le</h3>
        <strong>{completionRate}%</strong>
      </article>
    </div>
  )
}
