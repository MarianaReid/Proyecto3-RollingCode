const express = require('express');
const router = express.Router();
const { roles } = require('../constants/enum');
const {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/orders', isLoggedIn, getAllOrders);
router.get('/order/:id', isLoggedIn, getOneOrder);
router.post('/order', isLoggedIn, createOrder);
router.put('/order/:id', isLoggedIn, updateOrder);
router.delete('/order/:id', isLoggedIn, deleteOrder);

module.exports = router;
