const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy

const { User } = require('../models')

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: '/auth/kakao/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile._json)
        console.log('accessToken', accessToken, 'refreshToken', refreshToken)

        try {
          const exist_user = await User.findOne({
            where: { sns_id: profile.id, provider: 'kakao' },
          })

          if (exist_user) {
            done(null, exist_user)
          } else {
            // 사용자 정보를 json 타입으로 얻고 싶을때 ._json 사용
            console.log(profile._json)
            const user = await User.create({
              email: profile._json && profile._json.kakao_account_email,
              nickname: profile.displayName,
              sns_id: profile.id,
              provider: 'kakao',
            })
            done(null, user)
          }
        } catch (error) {
          console.error(error)
          done(error)
        }
      }
    )
  )
}
