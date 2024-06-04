const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const OrderSchema = new mongoose.Schema(
    {
        retailerId: {type: String, required: true},
        retailerPhoneNumber: {type: Number, required: true},
        wholesalerId: {type: objectId, ref: 'Wholesaler'},
        wholesalerName: {type: String, required: true},
        products: [{
            productId: {type: String},          
            name: {type: String},
            unitPrice: {type: Number, required: true, default: 0},
            quantity: {type: Number, default: 1}
        }],
        cost: {type: Number, default: 0},
        address: {type: String, required: true},
        status : {
            type: String,
            default: 'Pending',
            enum : ['Pending', 'Delivered', 'Cancelled']
        },
    },
    { timestamps: true }
);

const wholesalerOrder = mongoose.model("Order", OrderSchema);
module.exports = wholesalerOrder;
