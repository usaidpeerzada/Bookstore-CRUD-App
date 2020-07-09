var mongoose = require('mongoose');
var Float = require('mongoose-float').loadType(mongoose);
var BookSchema = new mongoose.Schema({
  isbn: String,
  title: String,
  author: String,
  description: String,
  published_year: Number,
  publisher: String,
  language: String,
  genre: [{type:String}],
  price: Float,
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Book', BookSchema);