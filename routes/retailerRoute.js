const router = require('express').Router();
const { retailerUpdateProfile, retailerLogin, retailerSignUp, retailerOrderHistory } = require('../controller/retailerController.js')
const Auth = require("../middleware/authMiddleware")

router.post('/signup', retailerSignUp)
router.post('/login', retailerLogin)
router.post('/updateprofile', Auth, retailerUpdateProfile)
router.get('/orderhistory', Auth, retailerOrderHistory)

model.exports = router;
