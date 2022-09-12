const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  loginUser,
  registerUser,
  getCount,
  deleteUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/get/count').get(getCount);
router.route('/:id').get(getUser).delete(deleteUser);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;
