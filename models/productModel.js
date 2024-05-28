const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId


const ProductSchema = new mongoose.Schema(
    {
        wholesalerId: {type: objectId, required: true, ref: 'Wholesaler'},
        productName: {type: String, required: [true, "Product name is missing"]},
        category: {type: Array},
        quantity: {type: Number, required: true, default: 0},
        image: {type: Number, required: false},
        unitPrice: {type: Number, required: true, default: 0},
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
