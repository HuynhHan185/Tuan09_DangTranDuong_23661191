import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { loginApi } from '../services/fakeApi'
import { authRequestAtom, authStateAtom } from '../state/authState'
import { validateLoginForm } from '../features/auth/schemas'

const INITIAL_VALUES = {
  email: '',
  password: '',
}

export default function LoginPage() {
  const navigate = useNavigate()
  const setAuth = useSetRecoilState(authStateAtom)
  const setAuthRequest = useSetRecoilState(authRequestAtom)
  const requestState = useRecoilValue(authRequestAtom)

  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const isFormValid = useMemo(
    () => validateLoginForm(values).isValid,
    [values],
  )

  const onChangeField = useCallback((event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const onBlurField = useCallback((event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validateLoginForm(values).errors)
  }, [values])

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      const validation = validateLoginForm(values)

      if (!validation.isValid) {
        setTouched({ email: true, password: true })
        setErrors(validation.errors)
        return
      }

      setAuthRequest({ isLoading: true, error: '' })
      try {
        const user = await loginApi(values)
        setAuth({
          isAuthenticated: true,
          user,
        })
        setAuthRequest({ isLoading: false, error: '' })
        navigate('/app', { replace: true })
      } catch (error) {
        setAuthRequest({
          isLoading: false,
          error: error instanceof Error ? error.message : 'Dang nhap that bai.',
        })
      }
    },
    [navigate, setAuth, setAuthRequest, values],
  )

  return (
    <main className="screen center">
      <form className="card auth-card" onSubmit={onSubmit} noValidate>
        <h1>Dang nhap</h1>
        <p className="muted">Nhap tai khoan de vao khu vuc quan ly cong viec.</p>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={onChangeField}
          onBlur={onBlurField}
          placeholder="ban@example.com"
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby={touched.email && errors.email ? 'login-email-error' : undefined}
        />
        {touched.email && errors.email ? (
          <p id="login-email-error" className="error-text">{errors.email}</p>
        ) : null}

        <label htmlFor="password">Mat khau</label>
        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={onChangeField}
          onBlur={onBlurField}
          placeholder=">= 6 ky tu"
          aria-invalid={Boolean(touched.password && errors.password)}
          aria-describedby={touched.password && errors.password ? 'login-password-error' : undefined}
        />
        {touched.password && errors.password ? (
          <p id="login-password-error" className="error-text">{errors.password}</p>
        ) : null}

        {requestState.error ? <p className="error-text">{requestState.error}</p> : null}

        <button type="submit" disabled={!isFormValid || requestState.isLoading}>
          {requestState.isLoading ? 'Dang xu ly...' : 'Dang nhap'}
        </button>
      </form>
    </main>
  )
}
