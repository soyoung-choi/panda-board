import { useState } from 'react'
import Panda from 'components/Panda'
import axios from 'axios'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'nickname') {
      setNickname(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'password_confirm') {
      setPasswordConfirm(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:3000/users/signup', {
        email,
        nickname,
        password,
        passwordConfirm,
      })
    } catch (error) {
      console.error(error)
    } finally {
      window.location.href = '/login'
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
        <label for="nickname">닉네임</label>
        <input
          id="nickname"
          type="text"
          name="nickname"
          value={nickname}
          onChange={onChange}
          placeholder="닉네임을 입력해주세요."
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
        <label for="password_confirm">비밀번호 확인</label>
        <input
          id="password_confirm"
          type="password"
          name="password_confirm"
          value={passwordConfirm}
          onChange={onChange}
          placeholder="비밀번호를 다시 입력해주세요."
        />
        <button>회원가입</button>
      </form>
    </>
  )
}

export default SignUp
