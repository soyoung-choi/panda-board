const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const { User } = require('../models')

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email', // form > input name
        passowrdField: 'password',
        session: true, // 세션 저장 여부
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email } })
          if (!user) {
            return done(null, false, { message: '존재하지 않는 사용자입니다.' })
          }
          const result = await bcrypt.compare(password, user.password)
          if (result) {
            // 비밀번호가 일치하면, done 두 번째 인자로 유저 정보 넘김
            return done(null, user)
          }
          return done(null, false, { message: '비밀번호가 틀립니다.' })
        } catch (e) {
          return done(e) // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
        }
      }
    )
  )
}
