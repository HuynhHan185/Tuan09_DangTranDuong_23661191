import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().trim().email('Email khong dung dinh dang.'),
  password: z
    .string()
    .trim()
    .min(6, 'Mat khau toi thieu 6 ky tu.')
    .max(32, 'Mat khau toi da 32 ky tu.'),
})

export function validateLoginForm(values) {
  const parsed = loginSchema.safeParse(values)

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
