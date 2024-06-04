const express = require('express')
const router = express.Router();
const Auth = require("../middleware/authMiddleware")
const { orderhistory, checkout } = require('../controller/ordersController.js')

router.get('/history', Auth, orderhistory)
router.post('/checkout', Auth, checkout)


module.exports = router;
