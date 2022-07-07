const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: String,
    required: true,
  },
});

exports.Product = mongoose.model('Product', productSchema);
