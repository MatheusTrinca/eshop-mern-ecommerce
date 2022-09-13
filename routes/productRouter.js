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
  upload,
  updateGalleryImages,
} = require('../controllers/productController');

router
  .route('/')
  .get(getAllProducts)
  .post(upload.single('image'), createProduct);
router.route('/get/count').get(getCount);
router.route('/get/featured/:count').get(getFeatured);
router.route('/:id').get(getProduct).put(updateProduct).delete(deleteProduct);
router
  .route('/gallery-images/:id')
  .patch(upload.array('images', 10), updateGalleryImages);

module.exports = router;
