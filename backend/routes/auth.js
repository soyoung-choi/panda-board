const express = require('express')
const router = express.Router()
const passport = require('passport')

// 카카오 로그인 시도
router.get('/kakao', passport.authenticate('kakao'))

// 카카오 로그인 성공시 callback
router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: '/',
  }),
  (req, res) => {
    res.redirect('/')
  }
)

module.exports = router
