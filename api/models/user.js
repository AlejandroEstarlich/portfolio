'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  surname: String,
  email: String,
  image: String,
  phone: String,
  password: String,
  role: String,
  last_login: { type: Date },
}, {
  timestamps: true
});

module.exports = mongoose.model('User', UserSchema);