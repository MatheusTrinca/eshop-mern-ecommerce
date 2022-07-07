const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  name: String,
  image: String,
  countInStock: {
    type: String,
    required: true,
  },
});

exports.Order = mongoose.model('Order', orderSchema);
