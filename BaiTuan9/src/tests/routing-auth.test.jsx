import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { authStateAtom } from '../state/authState'
import { renderApp } from './testUtils'

describe('Routing and auth flow', () => {
  it('redirects unauthenticated user to login when opening protected route', async () => {
    renderApp({ initialEntries: ['/app/tasks'] })

    expect(await screen.findByRole('heading', { name: /dang nhap/i })).toBeInTheDocument()
  })

  it('shows login validation errors on blur', async () => {
    renderApp({ initialEntries: ['/login'] })

    fireEvent.blur(screen.getByLabelText(/email/i))
    fireEvent.blur(screen.getByLabelText(/mat khau/i))

    expect(await screen.findByText(/email khong dung dinh dang/i)).toBeInTheDocument()
    expect(await screen.findByText(/mat khau toi thieu 6 ky tu/i)).toBeInTheDocument()
  })

  it('allows successful login and navigates to dashboard', async () => {
    renderApp({ initialEntries: ['/login'] })

    await userEvent.type(screen.getByLabelText(/email/i), 'abc@example.com')
    await userEvent.type(screen.getByLabelText(/mat khau/i), '123456')
    await userEvent.click(screen.getByRole('button', { name: /dang nhap/i }))

    await waitFor(() => {
      expect(screen.getByText(/tong task/i)).toBeInTheDocument()
    })
  })

  it('keeps authenticated user inside protected area', async () => {
    renderApp({
      initialEntries: ['/app/profile'],
      initializeState: ({ set }) => {
        set(authStateAtom, {
          isAuthenticated: true,
          user: { email: 'demo@example.com', displayName: 'demo' },
          
        })
      },
    })

    expect(await screen.findByText(/thong tin tai khoan/i)).toBeInTheDocument()
  })
})
