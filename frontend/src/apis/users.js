import instance from 'utils/interceptors'

// 회원가입
export const createUser = (email, password, passwordConfirm) => {
  return instance.post('/users/signup', {
    email,
    password,
    passwordConfirm,
  })
}

// 해당 회원 불러오기
export const fetchUser = (email) => {
  return instance.get(`/users/${email}`)
}

// 비밀번호 재설정
export const findPassword = (email) => {
  return instance.post('/users/forget-password', email)
}

// 비밀번호 재설정
export const resetPassword = (data) => {
  return instance.post('/users/reset-password', data)
}

// 해당 회원의 프로필 불러오기
export const fetchUserProfile = () => {
  return instance.get('/users/profile')
}
