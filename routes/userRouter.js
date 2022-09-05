const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  loginUser,
  registerUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser);
router.route('/login').post(loginUser);
router.route('/register').post(registerUser);

module.exports = router;
