import { memo } from 'react'

function TaskItem({ task, onToggle }) {
  return (
    <li className="task-item">
      <div>
        <p className={task.completed ? 'task-title done' : 'task-title'}>{task.title}</p>
        <small>Priority: {task.priority}</small>
      </div>
      <button type="button" onClick={() => onToggle(task.id)}>
        {task.completed ? 'Undo' : 'Done'}
      </button>
    </li>
  )
}

export default memo(TaskItem)
