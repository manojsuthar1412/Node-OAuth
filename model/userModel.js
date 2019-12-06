const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  google_id: String,
  thumbnail: String
});

var user = mongoose.model('user', userSchema);

module.exports = user;