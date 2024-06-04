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
  -	Models - contains
  -	Controller
  -	Routes
  -	Middleware
  -	App.js
  -	Package.json – contains the project’s dependencies


## Getting started
1.	Clone repository
2.	Npm install to get all the dependencies listed in the package.json file
3.	Create a .env file to store sensitive info like api keys for the M-pesa Daraja Api checkout
4.	Npm run app to run the api


## Features
- Json Web Token Authentication for routes
- Adding products to cart functionality




## End Points
### Retailers
  -	Sign up
  -	Login
  -	Update their Profile
  -	Search for a product by its name or category**
  -	Add a product to cart
  - Create an order - *Pending checkout feature using mobile money
  -	Check the order history
  -	Logout


### Wholesalers
  -	Sign up
  -	Login
  -	Update their Profile
  -	Create a product listing
  -	View their product listings
  -	Update a product listing
  -	Delete a product listing
  -	Get pending orders – filter according to date of order
  -	Logout


**To use the text search functionality, create an index with the key of a field you want to search and its value as “text”. E.g.   “db.Products.createIndex({productName: “text”})”
