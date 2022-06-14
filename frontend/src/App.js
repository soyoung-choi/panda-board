import './App.css'
import { useState } from 'react'
import 'styles/main.scss'

function App() {
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
  }

  return (
    <>
      <div>
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
            autoFocus
          />
          <button>로그인</button>
          <a href="http://localhost:3000/auth/kakao">
            <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" />{' '}
          </a>
        </form>
      </div>
    </>
  )
}

export default App
