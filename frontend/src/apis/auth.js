import instance from 'utils/interceptors'

export const createToken = (email, password) => {
  return instance.post('/auth/login', {
    email,
    password,
  })
}

export const deleteToken = () => {
  return instance.get('/auth/logout')
}
