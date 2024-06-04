const jwt = require('jsonwebtoken')
const Retailer = require('../models/retailerModel.js')
const dotenv = require('dotenv').config()
const Wholesaler = require("../models/wholesalerModel")

const auth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '')
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        const retailer = await Retailer.findOne({ _id: verifiedUser, 'tokens.token':token })
        const wholesaler = await Wholesaler.findOne({ _id: verifiedUser, 'tokens.token':token })
        req.token = token
        if (wholesaler) {
            req.wholesaler = wholesaler
        }
        if(retailer) {
            req.retailer = retailer
        }
        next()
    } catch (error) {
        res.status(401).send("You are not authorised!")
    }
}

module.exports = auth
