import { useState } from 'react'
import Panda from 'components/Panda'
import kakaoIcon from 'images/icon-kakao.svg'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      })
      console.log(response)
    } catch (error) {
      console.error(error)
    } finally {
      window.location.href = '/'
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
        />
        <label for="password">비밀번호</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요."
        />
        <button>로그인</button>
      </form>

      <a className="btn btn-kakao" href="http://localhost:3000/auth/kakao">
        <img src={kakaoIcon} alt="카카오 아이콘" />
        <span>카카오 로그인</span>
      </a>

      <a href="/signup">회원가입</a>
    </>
  )
}

export default Login
