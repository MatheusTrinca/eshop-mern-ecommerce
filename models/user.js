const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: String,
    required: true,
  },
});

exports.User = mongoose.model('User', userSchema);
