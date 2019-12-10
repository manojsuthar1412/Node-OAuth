const express =  require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');
const authGoogle = require('./controller/authGoogle');
const profileRoutes = require('./controller/profile-routes');
const passportSetup = require('./config/passport-setup');

const app = express();

const PORT =  process.env.PORT || 3000;

// set up view engine
app.set('view engine', 'ejs');

app.use(cookieSession({
  maxAge: 2 * 60 * 1000,
  keys: [keys.session.key]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connection to db
mongoose.connect(keys.mongodb.dbUrl, { useUnifiedTopology: true , useNewUrlParser: true}, (err) => {
  if(!err) console.log('Mongo DB connection succeded');
  else console.log(err);
});


app.get('/', (req, res) => {
  res.render('home', {user: req.user});
});

app.use('/auth', authGoogle);
app.use('/profile', profileRoutes);

app.listen(PORT, () => {
  console.log(`Server started listening on PORT ${PORT}`);
});
