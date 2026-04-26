import { z } from 'zod'

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'Tieu de toi thieu 3 ky tu.')
    .max(80, 'Tieu de toi da 80 ky tu.'),
  priority: z.enum(['low', 'medium', 'high'], {
    message: 'Muc do uu tien khong hop le.',
  }),
})

export function validateTaskForm(values) {
  const parsed = taskSchema.safeParse(values)

  if (parsed.success) {
    return { isValid: true, errors: {} }
  }

  const errors = {}
  parsed.error.issues.forEach((issue) => {
    const key = issue.path[0]
    if (!errors[key]) {
      errors[key] = issue.message
    }
  })

  return { isValid: false, errors }
}
