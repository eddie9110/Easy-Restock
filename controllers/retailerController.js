const Retailer = require('../models/retailerModel');
const bcrypt = require("bcrypt");

const retailerSignUp = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newRetailer = new Retailer({
            retailername: req.body.retailerName,
            email: req.body.email,
            password: hashedPass,
            phoneNumber: req.body.phoneNumber,
            location: req.body.location
        });
        const retailer = await newRetailer.save();
        res.status(200).json(retailer)
    } catch(error) {
        res.status(500).json(error)
    }
};

const retailerLogin = async (req, res) => {
    try{
        const retailer = await Retailer.findOne({email: req.body.email})
        if (!retailer) {
            return res.status(400).json("Please check your email!");
        }

        const validUser = await bcrypt.compare(req.body.password, retailer.password)
        if (!validUser) {
            return res.status(400).json("Please check your Password!")
        } 

        res.status(200).json("login successful")
    } catch (error) {
        res.status(500).json(error);
    }
};
