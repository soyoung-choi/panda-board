const express = require('express')
const router = express.Router()
const { Post, User } = require('../models')
const { verifyToken } = require('../middlewares/jwtCheck')

// 포스트 목록
router.get('/', verifyToken, async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email'], // 게시글 작성자 이메일
        },
      ],
      order: [['created_at', 'DESC']],
    })

    res.json({
      posts: posts,
    })
  } catch (error) {
    next(error)
  }
})

// 포스트 등록
router.post('/upload', verifyToken, async (req, res, next) => {
  const { title, contents } = req.body
  const { userId } = res.locals

  try {
    await Post.create({
      title: title,
      contents: contents,
      userId: userId,
    })

    res.json({
      message: '포스트가 등록되었습니다.',
    })
  } catch (error) {
    next(error)
  }
})

// 포스트 삭제
router.delete('/:id', verifyToken, async (req, res, next) => {
  const { id } = req.params

  try {
    await Post.destroy({ where: { id } })

    res.json({
      message: '해당 포스트가 삭제되었습니다.',
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
