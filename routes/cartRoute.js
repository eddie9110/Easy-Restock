const router = require('express').Router();
const { getCart, addToCart, deleteItemFromCart } = require('../controller/cartController.js')

router.get('/', getCart)
router.post('/addtocart', addToCart) // utilise query parameters /:productId instead of req.body
// router.delete('/deleteitem', deleteItemFromCart)

module.exports = router;
