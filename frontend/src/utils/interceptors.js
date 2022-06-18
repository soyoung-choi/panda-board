import axios from 'axios'
import { getTokenCookie } from 'utils/cookies'

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 1000,
})

// 요청 인터셉터 추가
instance.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 수행할 일
    config.headers['Content-Type'] = 'application/json'
    config.headers['Authorization'] = `Bearer ${getTokenCookie('access_token')}`

    return config
  },
  function (error) {
    // 오류 요청을 보내기전 수행할 일
    return Promise.reject(error)
  }
)

// 응답 인터셉터 추가
instance.interceptors.response.use(
  function (response) {
    // 응답 데이터를 가공
    return response
  },
  function (error) {
    // 오류 응답을 처리
    return Promise.reject(error)
  }
)

export default instance
