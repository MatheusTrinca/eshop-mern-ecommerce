const { Order } = require('../models/order');
const { OrderItem } = require('../models/order-item');

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name')
      .sort({ dateOrdered: -1 });

    if (!orders) {
      return res.status(500).json({
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name')
      .populate({
        path: 'orderItems',
        populate: {
          path: 'product',
          populate: 'category',
        },
      });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const orderItemsIds = Promise.all(
      req.body.orderItems.map(async orderItem => {
        let newOrderItem = new OrderItem({
          quantity: orderItem.quantity,
          product: orderItem.product,
        });
        newOrderItem = await newOrderItem.save();
        return newOrderItem._id;
      })
    );

    const result = await orderItemsIds;

    let order = new Order({
      orderItems: result,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: req.body.totalPrice,
      user: req.body.user,
    });

    order = await order.save();

    if (!order) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
