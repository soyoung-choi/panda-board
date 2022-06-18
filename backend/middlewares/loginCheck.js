exports.isLoggedIn = (req, res, next) => {
  console.log('req.isAuthenticated()', req.isAuthenticated())
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/auth/login')
  }
}

exports.isNotLoggedIn = (req, res, next) => {
  console.log('req.isAuthenticated()', req.isAuthenticated())
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.status(403).json({
      message: '이미 로그인된 상태입니다.',
    })
  }
}
