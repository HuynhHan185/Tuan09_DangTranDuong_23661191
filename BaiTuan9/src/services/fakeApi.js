const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export async function loginApi({ email, password }) {
  await delay(500)

  if (password.length < 6) {
    throw new Error('Thong tin dang nhap khong hop le.')
  }

  return {
    id: 'u_' + Math.random().toString(36).slice(2, 8),
    email,
    displayName: email.split('@')[0],
  }
}

export async function createTaskApi(payload) {
  await delay(500)

  if (payload.title.toLowerCase().includes('error')) {
    throw new Error('Server tam thoi loi. Thu lai voi tieu de khac.')
  }

  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : Date.now().toString(),
    ...payload,
    completed: false,
    createdAt: new Date().toISOString(),
  }
}
