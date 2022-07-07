const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { mongoose } = require('mongoose');

exports.getAllProducts = async (req, res) => {
  const products = await Product.find().select('name image -_id');
  if (!products) {
    res.status(500).json({
      success: false,
      message: 'Products not found',
    });
  }
  res.status(200).json({
    success: true,
    data: products,
  });
};

exports.createProduct = async (req, res) => {
  try {
    // Não está validando, pois Cast to ObjectId failed for value
    // Caindo direto no catch
    const category = await Category.findById(req.body.category);
    if (!category) {
      res.status(400).json({
        success: false,
        message: 'Invalid category',
      });
    }

    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    });

    product = await product.save();

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
