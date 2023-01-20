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
router.post('/cart', checkRole(roles.CLIENT), createCart);
router.put('/cart/:id', checkRole(roles.CLIENT), updateCart);
router.delete('/cart/:id', checkRole(roles.CLIENT), deleteCart);

module.exports = router;
