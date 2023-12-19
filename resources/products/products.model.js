const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  year: Number,
  desc: String,
  price: Number,
  color: String,
});

module.exports = mongoose.model('product', productSchema);
