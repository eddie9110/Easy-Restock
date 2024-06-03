const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const productRoute = require('./routes/productRoute')
const wholesalerRoute = require('./routes/wholesalerRoute')
const retailerRoute = require('./routes/retailerRoute')
const cartRoute = require('./routes/cartRoute')
const orderRoute = require('./routes/orderRoute')

dotenv.config()
const PORT = process.env.PORT || 3000
const app = express()
// const authRoute = require('./routes/authRoute')
// const retailerRoute = require('./routes/retailerRoute')

mongoose.connect('mongodb://localhost:27017/Easy-Restock')
.then(() => console.log("Success! Database connected"))
.catch(() => console.log("fail"))

// enabling sending of json in req & form data
app.use(express.json());
app.use(express.urlencoded({extended: false}));


// API routes
app.use('/api/products', productRoute);
app.use('/api/wholesalers', wholesalerRoute);
app.use('/api/retailers', retailerRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
