import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setTokenCookie = (accessToken) => {
  return cookies.set('accessToken', accessToken)
}

export const getTokenCookie = () => {
  return cookies.get('accessToken')
}

export const removeTokenCookie = () => {
  return cookies.remove('accessToken')
}
