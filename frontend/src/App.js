import './App.css'
import { useState } from 'react'
import 'styles/main.scss'
import panda from 'images/panda.svg'
import kakaoIcon from 'images/icon-kakao.svg'

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
        <div className="panda" style={{ width: '230px', margin: '50px auto' }}>
          <img
            src={panda}
            alt="판다"
            style={{ width: '100%', marginBottom: '10px' }}
          />
          <h1 style={{ fontSize: '36px', textAlign: 'center' }}>Panda Board</h1>
        </div>

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
      </div>
    </>
  )
}

export default App
