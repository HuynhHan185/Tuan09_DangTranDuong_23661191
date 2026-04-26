import { Suspense } from 'react'
import { MemoryRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { render } from '@testing-library/react'
import AppRouter from '../router/AppRouter'

export function renderApp({ initialEntries = ['/login'], initializeState } = {}) {
  return render(
    <RecoilRoot initializeState={initializeState}>
      <MemoryRouter initialEntries={initialEntries}>
        <Suspense fallback={<div>Loading...</div>}>
          <AppRouter />
        </Suspense>
      </MemoryRouter>
    </RecoilRoot>,
  )
}
