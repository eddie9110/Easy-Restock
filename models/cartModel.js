const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const CartSchema = new mongoose.Schema(
    {
        retailer: {
            type: objectId,
            ref: 'Retailer',
            required: true
        },
        products: [{
            productId: {type: objectId, ref: 'Product', required: true },
            name: {type: String, required: true},
            quantity: {type: Number, default: 1, required: true},
            unitPrice: {type: Number, required: true, default: 0},
            wholesalerId: {type: objectId, ref: 'Wholesaler'},
            wholesalerName: String,
        }],
        cartCost: {type: Number, default: 0, required: true}
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
