const Product = require('../models/productModel')

// for wholesalers
const getProducts = async(req, res) => {
    const wholesalerId = req.query.wholesaler
    if (!wholesalerId == req.wholesaler.id) {
        res.status(400).send("You are unauthorised!")
    }
    try {
        const products = await Product.find({wholesalerId: wholesalerId});
        res.status(200).json(products)
    } catch(error) {
        res.status(500).json({message:error.message});
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById({id});
        res.status(200).json(product)
    } catch(error) {
        res.status(500).json({message:error.message});
    }
};

const searchProduct = async (req, res) => {
    const searchQuery = req.query.query
    const page = req.query.page ? req.query.page:1
    const limit = 20

    try {
        const products = await Product.find({$text: {$search: searchQuery}})
        if (products) {
            const paginatedProducts = products.slice((page - 1) * limit, page * limit)
            return res.status(200).json(paginatedProducts)
        }
        else {
            return res.status(404).send("product not found")
        }
    } catch (error) {
        res.status(500).json(error)
    }
};

// for wholesalers only Creating a product listing
const createtProductListing = async (req, res) => {
    if(isSeller) {
    try{
        const newProduct = new Product({
            wholesalerId: req.user.id,
            productName: req.body.productName,
            wholesalerName: req.body.wholesalerName,
            category: req.body.category,
            quantity: req.body.quantity,
            unitPrice: req.body.unitPrice
        });
        const product = await newProduct.save();
        res.status(200).json({"Product listing created": product })
    } catch(error) {
        res.status(500).json(error)
    }
}
};


const putProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id)
        if (!product.wholesalerId == req.wholesaler.id) {
            return res.status(401).send("You are not authorised!")
        }

        if (req.body.quantity) {
            req.body.quantity = product.quantity + req.body.quantity
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!updatedProduct) {
            return res.status(404).json("product not found");
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error);
    }
};


const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById()
        if (!product.wholesalerId == req.wholesaler.id) {
            return res.status(401).send("You are not authorised!")
        }
        let deletedProduct = await Product.findByIdAndDelete(id);
        res.status(200).json({message: "Product deleted"});
    } catch (error) {
        res.status(500).json(error);
    }
};



module.exports = {
    getProducts,
    getProduct,
    createtProductListing,
    putProduct,
    deleteProduct,
    searchProduct
}
