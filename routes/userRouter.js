const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  createUser,
  getUser,
  loginUser,
} = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser);
router.route('/login').post(loginUser);

module.exports = router;
