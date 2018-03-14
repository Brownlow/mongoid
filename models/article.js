var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  date: String,
  saved: Boolean
});

var Article = mongoose.model('Article', articleSchema);

module.exports = Article;