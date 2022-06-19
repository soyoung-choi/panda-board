const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/loginCheck')

// 로그인
router.post('/login', isNotLoggedIn, async (req, res, next) => {
  try {
    passport.authenticate('local', (err, user, info) => {
      // 서버에 에러가 있는 경우
      if (err) return next(err)

      if (info) {
        // 로직 상 에러가 있는 경우
        return res.status(401).json({
          message: info.message,
        })
      }

      // serialize 호출
      return req.login(user, (err) => {
        if (err) return next(err)

        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.JWT_SECRET,
          { expiresIn: '7d' }
        )

        res.json({
          message: '로그인되었습니다.',
          accessToken,
        })
      })
    })(req, res, next)
  } catch (error) {
    return next(error)
  }
})

// 로그아웃
router.get('/logout', isLoggedIn, (req, res, next) => {
  req.logout(req.user, (err) => {
    if (err) return next(err)
    req.session.destroy()
    res.redirect('/login')
  })
})

// 카카오 로그인 시도
router.get('/kakao', passport.authenticate('kakao'))

// 카카오 로그인 성공시 callback
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/auth/login',
    successRedirect: '/',
  })
)

module.exports = router
