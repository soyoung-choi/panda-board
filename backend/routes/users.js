const express = require('express')
const router = express.Router()
const { User } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/loginCheck')
const crypto = require('crypto')

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { email, nickname, password, passwordConfirm } = req.body

  try {
    if (password !== passwordConfirm) {
      res.json({
        message: '비밀번호가 서로 일치하지 않습니다.',
      })
      return
    }

    const user = await User.findOne({
      where: {
        [Op.or]: [{ email }, { nickname }],
      },
    })

    if (user) {
      res.json({
        message: '이미 존재하는 회원입니다.',
      })
      return
    }

    // 12의 숫자가 더 높을 수록 복잡화, 소요시간은 오래걸림
    const hashPassword = await bcrypt.hash(password, 12)

    await User.create({
      email,
      nickname,
      password: hashPassword,
      provider: 'local',
    })

    res.json({
      message: '회원가입이 정상적으로 처리되었습니다. 로그인 후, 이용해주세요.',
    })
  } catch (error) {
    next(error)
  }
})

router.get('/', (req, res, next) => {
  const { nickname, provider, createdAt } = req.user
  console.log(nickname, provider, createdAt)
})

module.exports = router
