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

- 	Sign up - POST /api/retailers/signup
- 	The sign up information is passed in the request body in JSON format as follows:
- 		{
		"retailerName": "good kiosk",
		"email": "good.kiosk@email.com",
		"password": "password",
		"location": "Nairobi",
		"phoneNumber": "2540111111",
		"address": "Nairobi"
  		}
----
- 	Login - POST /api/retailers/login
- 	The  login information is passed in the request body in JSON format as follows:
- 		{
	  "	email": "good.kiosk@email.com",
	  	"password": "password"
  		}
--- 
  -	Update their Profile - PUT /api/retailers/updateprofile (In the request body, include the product field you want to update e.g. quantity, product name, e.t.c)
  -	In the request body, include the product field you want to update e.g. quantity, product name, e.t.c as shown)
  -		{
	  	"retailername": "Gooday general shop",
	  	"password": "password"
    		}
---
  -	Search for a product by its name or category** - POST /api/products/search?query=<"your_query">&page=<"page_you_want">
***
  -	Add a product to cart - POST /api/cart/addtocart (In the request body, indicate include the productId & quantity of items needed)
  -		The product id of the product to be added to cart is sent in the request body in json format alongside the quantity desired as shown bellow:
		{
		  "productId": "6652395fa3eb851a3493b213",
		  "quantity": 10
		}
***
-	Create an order - GET /api/orders/checkout  - *Pending checkout feature using mobile money
***
  -	Check the order history - GET api/orders/orderhistory/
***
  -	Logout - POST api/retailer/logout
  -		A post request containing the users token in the headers is sent and all the user’s tokens are cleared.  
***


### Wholesalers
  -	Sign up - POST /api/wholesalers/signup
  -	The sign up information is passed in the request body in JSON format as follows
  -		{
		"wholesalerName": "BC wholesalers",
		"email": "bc.wholesalers@email.com",
		"password": "pass",
		"location": "Nairobi West",
		"phoneNumber": "254714525379",
		"payBillNumber": "174379"
		}
***
  -	Login - POST /api/wholesalers/login
  -	The sign login information is passed in the request body in JSON format as follows
  -		{
		  "email": "bc.wholesalers@email.com",
		  "password": "pass"
		}
***
  -	Update their Profile - PUT /api/wholesalers/updateprofile
  -	Information to be updated is sent in the request body in JSON format as follows:
  -		{
		  "retailername": "Gooday general shop",
		  "password": "password"
		}
***
  -	Create a product listing - POST /api/products/
  -	Information to be updated is sent in the request body in JSON format as follows:
  -		{
		 "productName": "Whole grain biscuits",
		 "category": ["Biscuits", "Snacks"],
		 "quantity": 500,
		 "unitPrice": 100 
		}
***
  -	View their product listings - GET /api/products/
***
  -	Update a product listing - PUT /api/products/:product_id
  -	The information to be updated is passed in the request body in JSON format and the product id is sent as a request parameter
	  -		{
			  "quantity": 100,
			  "unitPrice": 130
			}
***
  -	Delete a product listing - DELETE api/products/:product_id
  -	Product Id of product to be deleted is sent as a request parameter
***
  -	Get pending orders - GET api/wholesalers/pendingorders
***
  -	Logout - POST api/wholesaler/logout
  -	A post request containing the users token in the headers is sent and all the user’s tokens are cleared.
***


**To use the text search functionality, create an index with the key of a field you want to search and its value as “text”. E.g.   “db.Products.createIndex({productName: “text”})”
