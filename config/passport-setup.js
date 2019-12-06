const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const keys = require('./keys');
const User = require('../model/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new GoogleStrategy({
    // google strategy options
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: '/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    // callback operations
    
    User.findOne({google_id: profile.id}).then((currentUser) => {
      if(currentUser) { 
        console.log('User already exits: \n' + currentUser); 
        done(null, currentUser);
      }
      else {
        new User({
          username: profile.displayName,
          google_id: profile.id,
          thumbnail: profile._json.picture
        }).save().then((newUser) => {
          console.log('User created successfully: \n' + newUser);
          done(null, newUser);
        })
      }
    });
  }
  )
);