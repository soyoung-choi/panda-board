import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Panda from 'components/Panda'
import kakaoIcon from 'images/icon-kakao.svg'
import { createToken } from 'apis/auth'
import { setTokenCookie } from 'utils/cookies'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const {
        data: { accessToken },
      } = await createToken(email, password)

      if (accessToken) setTokenCookie(accessToken)
      navigate('/')
    } catch (error) {
      alert(error.response.data.message)
    } finally {
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <Panda />
      <form onSubmit={onSubmit} className="login-form">
        <label for="email">이메일</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요."
          autoFocus
          required
        />
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요."
          required
        />
        <button>로그인</button>
      </form>

      {/* <a className="btn btn-kakao" href="http://localhost:5001/auth/kakao">
        <img src={kakaoIcon} alt="카카오 아이콘" />
        <span>카카오 로그인</span>
      </a> */}

      <a className="description" href="/signup">
        회원가입
      </a>
    </>
  )
}

export default Login
