'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = Schema({
  title: String,
  technologies: String,
  content: String,
  image: String,
  type: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', ArticleSchema);
// MongoDB nos crea la colección articles y guarda los objetos de este tipo