const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();

  if (!products) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
  res.status(200).json({
    success: true,
    data: products,
  });
});

router.post('/', async (req, res) => {
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  await product.save();

  res.status(201).json({
    success: true,
    data: product,
  });
});

module.exports = router;
