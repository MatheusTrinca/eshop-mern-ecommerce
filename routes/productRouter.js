const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getCount,
  getFeatured,
} = require('../controllers/productController');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/get/count').get(getCount);
router.route('/get/featured/:count').get(getFeatured);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
