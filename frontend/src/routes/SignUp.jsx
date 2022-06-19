import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Panda from 'components/Panda'
import { createUser } from 'apis/users'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    } else if (name === 'password_confirm') {
      setPasswordConfirm(value)
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const result = await createUser(email, password, passwordConfirm)

      if (!result.data.success) {
        alert(result.data.message)
      } else {
        alert(result.data.message)
        navigate('/login')
      }
    } catch (error) {
      alert(error.response.data.message)
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
        <a className="description" href="/login">
          뒤로가기
        </a>
      </form>
    </>
  )
}

export default SignUp
