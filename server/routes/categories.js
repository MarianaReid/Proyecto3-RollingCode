const express = require('express');
const router = express.Router();
const { roles } = require('../constants/enum');
const {
  getAllCategories,
  getOneCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/categories', getAllCategories);
router.get('/category/:id', isLoggedIn, getOneCategory);
router.post('/category',checkRole(roles.ADMIN), createCategory);
router.put('/category/:id',checkRole(roles.ADMIN), updateCategory);
router.delete('/category/:id',checkRole(roles.ADMIN), deleteCategory);

module.exports = router;
