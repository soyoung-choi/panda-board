const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded) {
      res.locals.userId = decoded.userId
      next()
    } else {
      res.status(401).json({ message: '토큰이 만료되었습니다.' })
    }
  } catch (error) {
    res.status(401).json({ message: error })
  }
}

exports.verifyToken = verifyToken
