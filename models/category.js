const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: String,
    required: true,
  },
});

exports.Category = mongoose.model('Category', categorySchema);
