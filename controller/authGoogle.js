const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile']
  })
);

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  // passport handles redirect
  res.redirect('/profile');
});

router.get('/login', (req, res) => {
  res.render('login', {user: req.user});
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;