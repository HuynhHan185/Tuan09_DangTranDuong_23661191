import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authStateAtom } from '../state/authState'
import { renderApp } from './testUtils'

const authInitializer = ({ set }) => {
  set(authStateAtom, {
    isAuthenticated: true,
    user: { email: 'demo@example.com', displayName: 'demo' },
  })
}

describe('Tasks feature behavior', () => {
  it('shows validation when title is too short', async () => {
    renderApp({ initialEntries: ['/app/tasks'], initializeState: authInitializer })

    const titleInput = await screen.findByLabelText(/tieu de/i)
    await userEvent.type(titleInput, 'ab')
    await userEvent.tab()

    expect(await screen.findByText(/tieu de toi thieu 3 ky tu/i)).toBeInTheDocument()
  })

  it('adds task successfully and can toggle status', async () => {
    renderApp({ initialEntries: ['/app/tasks'], initializeState: authInitializer })

    const titleInput = await screen.findByLabelText(/tieu de/i)
    await userEvent.type(titleInput, 'Hoc recoil selector')
    await userEvent.click(screen.getByRole('button', { name: /them task/i }))

    expect(await screen.findByText(/hoc recoil selector/i)).toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: /done/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /undo/i })).toBeInTheDocument()
    })
  })

  it('shows server error when title triggers failure edge case', async () => {
    renderApp({ initialEntries: ['/app/tasks'], initializeState: authInitializer })

    const titleInput = await screen.findByLabelText(/tieu de/i)
    await userEvent.type(titleInput, 'error-case title')
    await userEvent.click(screen.getByRole('button', { name: /them task/i }))

    expect(await screen.findByRole('alert')).toHaveTextContent(/server tam thoi loi/i)
  })
})
