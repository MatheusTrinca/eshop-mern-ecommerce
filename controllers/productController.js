const { Product } = require('../models/product');
const { Category } = require('../models/category');
const { default: mongoose } = require('mongoose');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .select('name image')
      .populate('category');
    if (!products) {
      return res.status(404).json({
        success: false,
        message: 'Products not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (
      !mongoose.isValidObjectId(req.body.category) ||
      !(await Category.findById(req.body.category))
    ) {
      return res.status(400).json({
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

    return res.status(201).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid product ID',
    });
  }

  try {
    if (
      !mongoose.isValidObjectId(req.body.category) ||
      !(await Category.findById(req.body.category))
    ) {
      return res.status(400).json({
        success: false,
        message: 'Invalid category',
      });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      {
        new: true,
      }
    );
    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndRemove(req.params.id);
    return res.status(204).json({
      success: true,
      message: 'Product deleted',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
