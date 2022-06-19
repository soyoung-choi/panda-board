const passport = require('passport')
const local = require('./localStrategy')
const kakao = require('./kakaoStrategy')
const { User } = require('../models')

module.exports = () => {
  // 로그인 인증 성공 시 한 번만 실행
  passport.serializeUser((user, done) => {
    return done(null, user.id) // 세션 저장소에 id를 저장
  })

  // 로그인 인증이 되어있는 경우, 요청할 때마다 실행
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({
        where: { id },
      })
      return done(null, user) // 불러온 user 정보는 req.user에 저장
    } catch (error) {
      return done(error)
    }
  })

  local()
  kakao()
}
