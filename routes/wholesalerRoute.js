const router = require('express').Router();
const { wholesalerUpdateProfile, wholesalerLogin, wholesalerSignUp, wholesalerFulfilledOrders, wholesalerPendingOrders } = require('../controller/wholesalerController.js')
const Auth = require("../middleware/authMiddleware")

router.post('/signup', wholesalerSignUp)
router.post('/login', wholesalerLogin)
router.post('/updateprofile', Auth, wholesalerUpdateProfile)
router.get('/pendingorders', Auth, wholesalerPendingOrders)
router.get('/fulfilledorders', Auth, wholesalerFulfilledOrders) 

module.exports = router;
