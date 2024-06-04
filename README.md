# Easy Restock
## Project Background
In Kenya, many wholesale shops do not have their own websites where retailers can place orders. This means that crucial information is unavailable to kiosk owners who have to result to going physically to the wholesale shops or calling several wholesale shops to inquire on the availability of goods and the pricing.
Easy Restock is a solution to that. Easy-Restock is an API that can be used to build an ecommerce platform to connect wholesalers and retailers in Kenya. 
This project could also benefit wholesalers by having access to a large pool of retailers and reducing the time spent of phone calls answering buyers’ inquiries to spend it elsewhere. 

## Tools and languages used
  -	Express Js framework
  -	Thunder Client
  -	Moongose ODM
  -	MongoDB Database

## Api Structure
  -	Models - contains the layout of database entries
  -	Controller - contains controller functions
  -	Routes - contains the routes for different controller functions
  -	Middleware - contains the route authorisation middleware
  -	App.js - contains an instance of express app
  -	Package.json – contains the project’s dependencies


## Getting started

    Clone the repository:

git clone https://github.com/eddie9110/Easy-Restock.git

    Install dependencies present in the package.json file: run Npm install

    Clone the repository:

    Create a .env file to store your json web token secret keys: e.g. JWT_SECRET = <"your generated secret key">

    Run the server: Npm run app





## Features
- Json Web Token Authentication for routes
- Adding products to cart functionality




## Api End Points
- To use some end-points, you have to be logged in so as to get a json web token that you can place in your api client headers with the key: Authorization and value: Bearer <"your assigned web token">
- A demo video of the api end points in use is coming soon

### Retailers
  -	Sign up - POST /api/retailers/signup
  -	Login - POST /api/retailers/login
  -	Update their Profile - PUT /api/retailers/updateprofile (In the request body, include the product field you want to update e.g. quantity, product name, e.t.c)
  -	Search for a product by its name or category** - POST /api/products/search?query=<"your_query">&page=<"page_you_want">
  -	Add a product to cart - POST /api/cart/addtocart (In the request body, indicate include the productId & quantity of items needed)
  - Create an order - *Pending checkout feature using mobile money GET /api/orders/
  -	Check the order history - GET api/orders/orderhistory/
  -	Logout - POST api/retailer/logout


### Wholesalers
  -	Sign up - POST /api/wholesalers/signup
  -	Login - POST /api/wholesalers/login
  -	Update their Profile - PUT /api/wholesalers/updateprofile
  -	Create a product listing - POST /api/products/
  -	View their product listings - GET /api/products/
  -	Update a product listing - PUT /api/products/:product_id
  -	Delete a product listing - DELETE api/products/:product_id
  -	Get pending orders - GET api/wholesalers/pendingorders
  -	Logout - POST api/wholesaler/logout


**To use the text search functionality, create an index with the key of a field you want to search and its value as “text”. E.g.   “db.Products.createIndex({productName: “text”})”
