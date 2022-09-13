const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
