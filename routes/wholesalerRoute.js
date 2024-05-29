const router = require('express').Router();
const { wholesalerUpdateProfile, wholesalerLogin, wholesalerSignUp, wholesalerFulfilledOrders, wholesalerPendingOrders } = require('../controller/wholesalerController.js')

router.post('/signup', wholesalerSignUp)
router.post('/login', wholesalerLogin)
router.post('/updateprofile', wholesalerUpdateProfile)
router.get('/pendingorders', wholesalerPendingOrders)
router.get('/fulfilledorders', wholesalerFulfilledOrders) 

module.exports = router;
