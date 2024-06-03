const express = require('express')
const router = express.Router();
// const Auth = require("../middleware/authMiddleware")
const { orderhistory, checkout } = require('../controller/ordersController.js')

router.get('/history', orderhistory)
router.post('/checkout', checkout)


module.exports = router;
