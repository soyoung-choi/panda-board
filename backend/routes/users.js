var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', (req, res, next) => {
  const { nickname, provider, createdAt } = req.user
  console.log(nickname, provider, createdAt)
})

module.exports = router
