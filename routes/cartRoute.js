const router = require('express').Router();
const { getCart, addToCart, deleteItemFromCart } = require('../controller/cartController.js')

router.get('/', getCart)
router.post('/addtocart', addToCart)

module.exports = router;
