const Order = require("../models/orderModel")
const Cart = require("../models/cartModel")
const Retailer = require("../models/retailerModel")
const Wholesaler = require("../models/wholesalerModel")
// const mpesa = require("../mobileCheckout.js")

const orderhistory = async (req, res) => {
    const retailer = req.user._id;
    try {
        const order = await Order.find({ retailer: retailer })
        if(order) {
            return res.status(200).send(order)
        }
        res.status(404).send('No orders found')
    } catch (error) {
        res.status(500).send()
    }
}

// retailers checkout
const checkout = async(req, res) => {
    try {
        const retailerId = req.body.retailer // req.retailer._id; // sent by middleware
        const retailer = await Retailer.findOne({ _id: retailerId });
        const retailerPhoneNumber = retailer.phoneNumber;
        let cart = await Cart.findOne({retailer})
        if(cart) {
            // extract wholesalersids that have orders
            const wholesalerIds = new Set()
            cart.products.forEach(foundCallBack) // 
            function foundCallBack(orderInCart) {
                const { wholesalerId } = (orderInCart)
                wholesalerIds.add(wholesalerId)
            }

            // console.log(wholesalerIds)
            // console.log(productsInCart)
          
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

                // create
                if(true) { // if payment was successful
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
                    const cartData = await Cart.findByIdAndDelete({_id: cart.id}) //delete entire / part or update and then delete
                    // try without return followed by deleted the cart
                    res.end("Payment was successful. Your order is being processed.")
                } else {
                    return res.status(400).send("Payment was not successful!")
                }
            }
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
