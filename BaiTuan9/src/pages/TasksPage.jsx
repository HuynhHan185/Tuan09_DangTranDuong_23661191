import { useCallback } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import TaskForm from '../features/tasks/components/TaskForm'
import TaskList from '../features/tasks/components/TaskList'
import useTaskActions from '../features/tasks/hooks/useTaskActions'
import {
  taskFilterAtom,
  taskMutationStateAtom,
  visibleTasksSelector,
} from '../state/taskState'

export default function TasksPage() {
  const [filter, setFilter] = useRecoilState(taskFilterAtom)
  const mutationState = useRecoilValue(taskMutationStateAtom)
  const visibleTasks = useRecoilValue(visibleTasksSelector)
  const { addTask, toggleTask } = useTaskActions()

  const onChangeFilter = useCallback((event) => {
    const { name, value } = event.target
    setFilter((prev) => ({ ...prev, [name]: value }))
  }, [setFilter])

  return (
    <div className="tasks-layout">
      <TaskForm onSubmit={addTask} isLoading={mutationState.isLoading} />

      <section>
        <div className="card filters">
          <h3>Bo loc</h3>
          <label htmlFor="status">Trang thai</label>
          <select id="status" name="status" value={filter.status} onChange={onChangeFilter}>
            <option value="all">Tat ca</option>
            <option value="pending">Chua xong</option>
            <option value="done">Da xong</option>
          </select>

          <label htmlFor="query">Tim nhanh</label>
          <input
            id="query"
            name="query"
            value={filter.query}
            onChange={onChangeFilter}
            placeholder="Nhap tu khoa"
          />
        </div>

        {mutationState.error ? (
          <p className="card error-text" role="alert">{mutationState.error}</p>
        ) : null}

        <TaskList tasks={visibleTasks} onToggle={toggleTask} />
      </section>
    </div>
  )
}
