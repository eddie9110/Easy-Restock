const router = require('express').Router();
const { retailerUpdateProfile, retailerLogin, retailerSignUp, retailerOrderHistory } = require('../controller/retailerController.js')

router.post('/signup', retailerSignUp)
router.post('/login', retailerLogin)
router.post('/updateprofile', retailerUpdateProfile)
router.get('/orderhistory', retailerOrderHistory)

