import { atom, selector } from 'recoil'

export const tasksAtom = atom({
  key: 'tasksAtom',
  default: [],
})

export const taskFilterAtom = atom({
  key: 'taskFilterAtom',
  default: {
    status: 'all',
    query: '',
  },
})

export const taskMutationStateAtom = atom({
  key: 'taskMutationStateAtom',
  default: {
    isLoading: false,
    error: '',
  },
})

export const visibleTasksSelector = selector({
  key: 'visibleTasksSelector',
  get: ({ get }) => {
    const tasks = get(tasksAtom)
    const filter = get(taskFilterAtom)
    const query = filter.query.trim().toLowerCase()

    return tasks.filter((task) => {
      const passStatus =
        filter.status === 'all'
          ? true
          : filter.status === 'done'
            ? task.completed
            : !task.completed

      const passQuery = query.length === 0 || task.title.toLowerCase().includes(query)

      return passStatus && passQuery
    })
  },
})

export const taskStatsSelector = selector({
  key: 'taskStatsSelector',
  get: ({ get }) => {
    const tasks = get(tasksAtom)
    const total = tasks.length
    const done = tasks.filter((task) => task.completed).length

    return {
      total,
      done,
      pending: total - done,
    }
  },
})
