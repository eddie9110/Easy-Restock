const mongoose = require("mongoose")
const validator = require('validator')

const RetailerSchema = new mongoose.Schema(
    {
        retailername: {type: String, required: true, unique: true},
        email: {type: String, required: true, unique: true, validate(value) {
            if( !validator.isEmail(value)) {
                 throw new Error("Enter a valid email address")
                }
            }},
        password: {type: String, required: true},
        phoneNumber: {type: String, required: true, unique: true},
        location: {type: String, required: true}
    },
    { timestamps: true }
);

const Retailer = mongoose.model("Retailer", RetailerSchema);

module.exports = Retailer;
