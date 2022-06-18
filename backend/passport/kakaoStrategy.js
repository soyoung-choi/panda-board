const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const { User } = require('../models')

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_REDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'kakao' },
          })

          if (exUser) {
            done(null, exUser)
          } else {
            const newUser = await User.create({
              email: profile._json && profile._json.kakao_account.email,
              snsId: profile.id,
              provider: 'kakao',
            })

            done(null, newUser)
          }
        } catch (error) {
          done(error)
        }
      }
    )
  )
}
