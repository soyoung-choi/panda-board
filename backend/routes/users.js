const express = require('express')
const router = express.Router()
const { User } = require('../models')
const bcrypt = require('bcrypt')
const { isLoggedIn, isNotLoggedIn } = require('../middlewares/loginCheck')

// 회원가입
router.post('/signup', isNotLoggedIn, async (req, res, next) => {
  const { email, password, passwordConfirm } = req.body

  try {
    if ((!email || !password, !passwordConfirm)) {
      res.json({
        success: false,
        message: '모든 항목을 입력해주세요.',
      })
      return
    }

    if (password !== passwordConfirm) {
      res.json({
        success: false,
        message: '비밀번호가 서로 일치하지 않습니다.',
      })
      return
    }

    const user = await User.findOne({
      where: { email },
    })

    if (user) {
      res.json({
        success: false,
        message: '이미 존재하는 회원입니다.',
      })
      return
    }

    const hashPassword = await bcrypt.hash(password, 12)

    await User.create({
      email,
      password: hashPassword,
      provider: 'local',
    })

    res.status(201).json({
      success: true,
      message: '회원가입이 정상적으로 처리되었습니다.',
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
})

module.exports = router
