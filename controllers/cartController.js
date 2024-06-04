const Wholesaler = require("../models/wholesalerModel")
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

//get cart items
const getCart =  async (req, res) => {
  const retailer = req.retailer._id;

  try {
    const cart = await Cart.findOne({ retailer });
    if (cart && cart.products.length > 0) {
      res.status(200).json(cart);
    } else {
      res.send("No existing cart found!");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// utilise query parameters /:productId instead of req.body
//add cart
const addToCart =  async (req, res) => {
  const retailer = req.body.retailer;
  const { productId, quantity } = req.body;

  // extracting info from request sent
  try {
    const cart = await Cart.findOne({ retailer }); // looking for cart object belonging to retailer
    const product = await Product.findOne({ _id: productId }); // looking for product retailer is interested in buying

    if (!product) {
      res.status(404).send({ message: "The product was not found" });
      return;
    }

    const unitPrice = product.unitPrice;
    const name = product.productName;
    const productQuantity = product.quantity;
    const wholesalerId = product.wholesalerId;
    const wholesaler = await Wholesaler.findOne({ _id: wholesalerId });
    const wholesalerName = wholesaler.wholesalerName

    if (quantity <= productQuantity) {
      //If a cart already exists for user,
      if (cart) {
        const productExists = cart.products.findIndex((product) => product.productId == productId);

        //checking if product retailer wants to add to cart exists in cart
        if (productExists >= 0) {
          let existingProduct = cart.products[productExists];
          existingProduct.quantity += quantity;

          cart.cartCost = cart.products.reduce((sum, current) => {
              return sum + current.quantity * current.unitPrice;
          },0)
          cart.products[productExists] = existingProduct;
          await cart.save();
          res.status(200).send(cart);
        } else {
          console.log(name)
          cart.products.push({ productId, name, quantity, unitPrice, wholesalerId, wholesalerName }); // only one item can be pushed to cart at a time
          cart.cartCost = cart.products.reduce((sum, current) => {
              return sum + current.quantity * current.unitPrice;
          },0)

          await cart.save();
          res.status(200).send(cart);
        }
      } else { // if no cart is found for a retailer
          const newCart = await Cart.create({
              retailer,
              products: [{ productId, name, quantity, unitPrice, wholesalerId, wholesalerName }],
              cartCost: quantity * unitPrice
          });
        return res.status(201).send(newCart);
      }
    } else if (productQuantity == 0) {
      return res.status(400).json("Product is out of stock. It cannot be added to cart")
    } else {
      return res.status(400).json("Product quantity cannot be met. Try a lower quantity")
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

module.exports = { getCart, addToCart };
