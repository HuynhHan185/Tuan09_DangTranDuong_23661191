import { atom, selector } from 'recoil'

export const authStateAtom = atom({
  key: 'authStateAtom',
  default: {
    isAuthenticated: false,
    user: null,
  },
})

export const authRequestAtom = atom({
  key: 'authRequestAtom',
  default: {
    isLoading: false,
    error: '',
  },
})

export const currentUserSelector = selector({
  key: 'currentUserSelector',
  get: ({ get }) => get(authStateAtom).user,
})

export const isAuthenticatedSelector = selector({
  key: 'isAuthenticatedSelector',
  get: ({ get }) => get(authStateAtom).isAuthenticated,
})
