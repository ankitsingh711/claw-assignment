# E-Commerce Platform with Advanced Features

# Deplohyed Render Link - https://claw-assignment.onrender.com/

## Overview -

This project is a comprehensive e-commerce platform built with Node.js, Supabase, and MongoDB. It includes features such as user management, product listings, shopping cart functionality, order management, session tracking, and integration with an external payment gateway API. The application is deployed on Render and Netlify.

## Features -

1. User Management: Register, login, and manage users with role-based access control.
2. Product Management: Admins can create, read, update, and delete products.
3. Shopping Cart: Users can add products to their cart, view the cart, and place orders.
4. Order Management: Users can view their past orders.
5. Payment Processing: Integration with an external payment gateway API.
6. Session Management: Track user sessions with login times, logout times, and IP addresses

## Steps to Start the Application :

1. Install dependencies - npm install
2. Build - npm run build
3. Development Run - npm run dev

## Database -

1. MongoDB - NoSQL
2. postgreSQL - SQL

## Packages Used -

express, mongoose, supabase, jsonwebtoken, bcryptjs, ts-node, typescript, cors, body-parser, sender, stripe, nodemailer, dotenv

`POST` - /register : Register a new user :
payload : {
"name": "test3",
"email": "test3@mail.com",
"password": "123456"
}

`POST` - /login : Login User :
paylaod : {
"name": "admin@mail.com",
"password": "123456"
}

`POST` - /products: Create a new products ( admin access only )
payload : {
"name": "shirts-skechers",
"description": "this is skechers",
"price": 2300,
"stock_quantity": 200
}

`GET` - /products: Retrieve all products.
response : [
{
"_id": "66a656c9239f965e6a51f186",
"name": "pants",
"description": "this is pants",
"price": 1000,
"stock_quantity": 120,
"__v": 0
},
{
"_id": "66a66edf9697cd34e0630d89",
"name": "shirts-skechers",
"description": "this is skechers",
"price": 2300,
"stock_quantity": 200,
"__v": 0
}
]


`PUT` - /products/:id: Update a product by ID (admin only)
payload : {
field: value
}

- `DELETE` - /products/:id: Delete a product by ID (admin only).
  payload : {
  productId: ''
  }

- `POST` /cart: Add a product to the shopping cart.
  payload : {
  "productId": "66a66edf9697cd34e0630d89",
  "quantity": 4
  }

- `GET` /cart: Retrieve the user's shopping cart.
  response :

- `POST` /orders: Place an order.

- `GET` /orders: Retrieve all orders for the logged-in user.

  - `GET` /sessions: Retrieve all user sessions.

  - `POST` /payment: Process a payment through the external payment gateway.


## ROLE BASED ACCESS - 
Admin Can Handle the Product Routes - 

`/productc` : delete, update, cretae and read

## PAYMENT - STRIPE

Used Stripe Client for Payment Processing 

## ------------> .env files should have these fields - required <----------------------##

PORT = your_suitable_port
DB_URL = your_mongo_url
SUPABASE_KEY = your_supabase_key
STRIPE_KEY = yout_stripe_key // you will get it from stipe.com - login and go to APIs SDK
STRIPE_SECRET_KEY your_stripe_secret_key
