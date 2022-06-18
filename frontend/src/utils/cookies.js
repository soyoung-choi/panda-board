import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setTokenCookie = (access_token) => {
  return cookies.set('access_token', access_token)
}

export const getTokenCookie = () => {
  return cookies.get('access_token')
}

export const removeTokenCookie = () => {
  return cookies.remove('access_token')
}
