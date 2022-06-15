import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from 'routes/Home'
import Login from 'routes/Login'
import SignUp from 'routes/SignUp'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Home />} />

          <Route exact path="/signup" element={<SignUp />} />
        </>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
