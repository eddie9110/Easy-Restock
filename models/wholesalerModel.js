const mongoose = require("mongoose")
const validator = require('validator')

const WholesalerSchema = new mongoose.Schema(
    {
        wholesalerName: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true, validate(value) {
            if( !validator.isEmail(value)) {
                 throw new Error("Enter a valid email address")
                }
            }},
        password: {type: String, required: true},
        location: {type: String, required: true},
        phoneNumber: {type: String, required: true, unique: true},
        payBillNumber: {type: String, unique: true},
        accountNumber: {type: String, unique: true},
        buyGoodsNumber: {type: String, unique: true}
    },
    { timestamps: true }
);

const Wholesaler = mongoose.model("Wholesaler", WholesalerSchema);

module.exports = Wholesaler;
