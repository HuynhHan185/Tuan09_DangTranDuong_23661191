import TaskItem from './TaskItem'

export default function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p className="card">Khong co task phu hop bo loc.</p>
  }

  return (
    <ul className="task-list card">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} />
      ))}
    </ul>
  )
}
