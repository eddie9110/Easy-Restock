const express = require('express')
const router = express.Router();
const { getProducts, getProduct, createtProductListing, putProduct, deleteProduct } = require('../controller/productController')
const Auth = require("../middleware/authMiddleware")

router.get('/', getProducts)
router.get('/search', searchProduct)
router.get('/:id', getProduct)
router.post('/', Auth, createtProductListing)
router.put('/:id', Auth, putProduct)
router.delete('/:id', Auth, deleteProduct)

module.exports = router;
