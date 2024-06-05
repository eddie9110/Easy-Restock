const Order = require("../models/orderModel")
const Cart = require("../models/cartModel")
const Retailer = require("../models/retailerModel")
const Wholesaler = require("../models/wholesalerModel")
// const mpesa = require("../mobileCheckout.js")

const orderhistory = async (req, res) => {
    const retailer = req.retailer._id;
    try {
        const order = await Order.find({ retailer: retailer })
        if(order) {
            return res.status(200).json(order)
        }
        res.status(404).json("You have no order history")
    } catch (error) {
        res.status(500).send(error)
    }
}

// retailers checkout
const checkout = async(req, res) => {
    try {
        const retailerId = req.retailer.id
        const retailer = await Retailer.findOne({ _id: retailerId });
        const retailerPhoneNumber = retailer.phoneNumber;
        let cart = await Cart.findOne({retailer})
        if(cart) {
            // extract wholesalerids that have orders
            const wholesalerIds = new Set()
            cart.products.forEach(foundCallBack) // 
            function foundCallBack(orderInCart) {
                const { wholesalerId } = (orderInCart)
                wholesalerIds.add(wholesalerId)
            }
            let orders = []
            for (let wholesalerId of wholesalerIds) {
                const salesPerShop = cart.products.filter(element => element.wholesalerId == wholesalerId)
                console.log(salesPerShop);
                const costPerShop = salesPerShop.reduce((sum, current) => {
                    return sum + current.quantity * current.unitPrice;
                },0)
                console.log(costPerShop)
                const wholesaler = await Wholesaler.findOne({ _id: wholesalerId });
                const paybillNumber = wholesaler.payBillNumber;
                // charge customer per shop
                // await payment to complete even if failed, proceed to other shops
                // payment logic goes before this line
                const order = await Order.create({ // create pending order in every wholesaler's page after successful payment confirmation  await promise while paying, chaining then, promise.all()
                    // transaction Id
                    wholesalerId,
                    wholesalerName: wholesaler.wholesalerName,
                    retailerId,
                    retailerPhoneNumber,
                    products: salesPerShop,
                    cost: costPerShop,
                    address: req.body.address
                })
                orders.push(order)
            }
            res.status(200).send(orders)
            const cartData = await Cart.findByIdAndDelete({_id: cart.id})
        } else {
            res.status(400).send("No cart was found")
        }
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { 
    orderhistory,
    checkout
};
