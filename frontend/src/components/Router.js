import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Login from 'routes/Login'
import SignUp from 'routes/SignUp'
import { getTokenCookie } from 'utils/cookies'

const AppRouter = () => {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = getTokenCookie()

    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<SignUp />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
