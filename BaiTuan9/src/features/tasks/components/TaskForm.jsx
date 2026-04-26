import { useCallback, useMemo, useState } from 'react'
import { validateTaskForm } from '../schemas'

const INITIAL_VALUES = {
  title: '',
  priority: 'medium',
}

export default function TaskForm({ onSubmit, isLoading }) {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const isFormValid = useMemo(
    () => validateTaskForm(values).isValid,
    [values],
  )

  const updateField = useCallback((event) => {
    const { name, value } = event.target

    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const onBlurField = useCallback((event) => {
    const { name } = event.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors(validateTaskForm(values).errors)
  }, [values])

  const onSubmitForm = useCallback(
    async (event) => {
      event.preventDefault()

      const validation = validateTaskForm(values)
      if (!validation.isValid) {
        setTouched({ title: true, priority: true })
        setErrors(validation.errors)
        return
      }

      const result = await onSubmit({
        title: values.title.trim(),
        priority: values.priority,
      })

      if (result.ok) {
        setValues(INITIAL_VALUES)
        setTouched({})
        setErrors({})
      }
    },
    [onSubmit, values],
  )

  return (
    <form className="card" onSubmit={onSubmitForm} noValidate>
      <h3>Them cong viec</h3>

      <label htmlFor="title">Tieu de</label>
      <input
        id="title"
        name="title"
        value={values.title}
        onChange={updateField}
        onBlur={onBlurField}
        placeholder="VD: Hoan thanh bai tuan 9"
        aria-invalid={Boolean(touched.title && errors.title)}
        aria-describedby={touched.title && errors.title ? 'task-title-error' : undefined}
      />
      {touched.title && errors.title ? (
        <p id="task-title-error" className="error-text">{errors.title}</p>
      ) : null}

      <label htmlFor="priority">Uu tien</label>
      <select
        id="priority"
        name="priority"
        value={values.priority}
        onChange={updateField}
        onBlur={onBlurField}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <button type="submit" disabled={!isFormValid || isLoading}>
        {isLoading ? 'Dang tao...' : 'Them task'}
      </button>
    </form>
  )
}
