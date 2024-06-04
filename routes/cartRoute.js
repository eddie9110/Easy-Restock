const router = require('express').Router();
const { getCart, addToCart, deleteItemFromCart } = require('../controller/cartController.js')
const Auth = require("../middleware/authMiddleware")

router.get('/', Auth, getCart)
router.post('/addtocart', Auth, addToCart)

module.exports = router;
