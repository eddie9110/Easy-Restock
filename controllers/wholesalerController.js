const bcrypt = require("bcrypt")
const Wholesaler = require('../models/wholesalerModel')

// login end-point for wholesalers
const wholesalerLogin = async (req, res) => {
    try{
        const wholesaler = await Wholesaler.findOne({email: req.body.email})
        if (!wholesaler) {
            return res.status(400).json("Please check your email!");
        }
        const validUser = await bcrypt.compare(req.body.password, wholesaler.password)
        if (!validUser) {
            return res.status(400).json("Please check your Password!")
        }
        res.status(200).json("login successful")
    } catch (error) {
        res.status(500).json(error);
    }
};


//sign up end-point for wholesalers
const wholesalerSignUp = async (req, res) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newWholesaler = new Wholesaler({
            wholesalerName: req.body.wholesalerName,
            email: req.body.email,
            password: hashedPass,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber
        });
        const wholesaler = await newWholesaler.save();
        res.status(200).json(wholesaler)
    } catch(error) {
        res.status(500).json(error)
    }
};
