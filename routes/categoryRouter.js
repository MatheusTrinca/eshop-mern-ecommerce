const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  createCategory,
  deleteCategory,
  getCategory,
  updateCategory,
} = require('../controllers/categoryController');

router.route('/').get(getAllCategories).post(createCategory);
router
  .route('/:id')
  .get(getCategory)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
