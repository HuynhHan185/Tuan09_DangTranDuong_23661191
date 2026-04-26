import { useCallback } from 'react'
import { useSetRecoilState } from 'recoil'
import { createTaskApi } from '../../../services/fakeApi'
import { taskMutationStateAtom, tasksAtom } from '../../../state/taskState'

export default function useTaskActions() {
  const setTasks = useSetRecoilState(tasksAtom)
  const setMutationState = useSetRecoilState(taskMutationStateAtom)

  const addTask = useCallback(
    async (input) => {
      setMutationState({ isLoading: true, error: '' })

      try {
        const createdTask = await createTaskApi(input)
        setTasks((prev) => [createdTask, ...prev])
        setMutationState({ isLoading: false, error: '' })
        return { ok: true }
      } catch (error) {
        setMutationState({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Da xay ra loi.',
        })
        return { ok: false }
      }
    },
    [setMutationState, setTasks],
  )

  const toggleTask = useCallback(
    (taskId) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        ),
      )
    },
    [setTasks],
  )

  return {
    addTask,
    toggleTask,
  }
}
