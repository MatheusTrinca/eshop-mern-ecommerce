const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getTotalSales,
  getCount,
} = require('../controllers/orderController');

router.route('/').get(getAllOrders).post(createOrder);
router.route('/totalsales').get(getTotalSales);
router.route('/get/count').get(getCount);
router.route('/:id').get(getOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
