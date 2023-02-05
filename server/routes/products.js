const express = require('express');
const router = express.Router();
const { roles } = require('../constants/enum');
const {getAllProducts, getOneProduct,createProduct, updateProduct,deleteProduct} = require('../controllers/productController')
const { isLoggedIn, checkRole } = require('../middleware/auth');

router.get('/products',getAllProducts);
router.get('/product/:id',getOneProduct);
router.post('/createProduct',checkRole(roles.ADMIN), createProduct);
router.put('/product/:id',checkRole(roles.ADMIN),updateProduct);
router.delete('/product/:id',checkRole(roles.ADMIN),deleteProduct);



module.exports = router;