const express = require('express');
const router = express.Router();
const { roles } = require('../constants/enum');
const {
  getAllCarts,
  getOneCart,
  createCart,
  updateCart,
  deleteCart,
} = require('../controllers/cartController');
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/carts', isLoggedIn, getAllCarts);
router.get('/cart/:id', isLoggedIn, getOneCart);
router.post('/cart', isLoggedIn, createCart);
router.put('/cart/:id', isLoggedIn, updateCart);
router.delete('/cart/:id', isLoggedIn, deleteCart);

module.exports = router;
