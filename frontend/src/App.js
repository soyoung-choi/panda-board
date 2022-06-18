import { useEffect, useState } from 'react'
import AppRouter from 'components/Router'
import { getTokenCookie } from 'utils/cookies'

function App() {
  const [token, setToken] = useState(null)

  useEffect(() => {
    const token = getTokenCookie('access_token')
    if (token) {
      setToken(token)
    }
  }, [])

  return (
    <>
      <AppRouter isLoggedIn={Boolean(token)} />
    </>
  )
}

export default App
