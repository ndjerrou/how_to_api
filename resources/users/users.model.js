const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    min: 4,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 255,
  },
});

module.exports = mongoose.model('user', userSchema);
