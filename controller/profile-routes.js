const router = require('express').Router();

const authCheck = (req, res, next) => {
  if(!req.user) {
    // if user is not logged in
    res.redirect('/')
  } else {
    next();
  }
}

router.get('/', authCheck, (req, res) => {
  res.render('profile', { user: req.user})
})

module.exports = router;