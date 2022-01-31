# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## Database Schema
## users table 
- The up migration:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL, 
    password_digest VARCHAR
);
## products table
- The up migration:
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price integer NOT NULL
);
## orders table
- The up migration:
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(10),
    user_id bigint REFERENCES users(id) ON DELETE CASCADE
);
## order_products table
- The up migration:
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id) ON DELETE CASCADE,
    product_id bigint REFERENCES products(id) ON DELETE CASCADE
);


## API Endpoints

### Products
#### Index 
- Endpoint: /products
- HTTP verb: GET
- Request body: N/A
- Response body: array of products each with an id, name and price 
#### Show
- Endpoint: /products/:id
- HTTP verb: GET
- Request body: N/A
- Response body: The product that has the id in the req.params
#### Create [token required]
- Endpoint: /products
- HTTP verb: POST
- Request body: a product that has a name and a price
- Response body: The product that was created with id, name and price

### Users
#### Index [token required]
- Endpoint: /users
- HTTP verb: GET
- Request body: N/A
- Response body: array of users each with an id, first_name, last_name and password_digest 
#### Show [token required]
- Endpoint: /users/:id
- HTTP verb: GET
- Request body: N/A
- Response body: The user that has the id in the req.params
#### Create [a token is generated for every new created user]
- Endpoint: /users
- HTTP verb: POST
- Request body: a user that has first_name, last_name and password
- Response body: The user that was created with id, first_name, last_name and password_digest. The response also contains the generated token for that user.

### Orders
The index, show and create endpoints for orders were optional and not required in the project but I made them for convenience and ease of testing
#### Index [token required]
- Endpoint: /orders
- HTTP verb: GET
- Request body: N/A
- Response body: array of orders each with an id, status and userId of the user that made the order
#### Show [token required]
- Endpoint: /orders/:id
- HTTP verb: GET
- Request body: N/A
- Response body: The order that has the id in the req.params
#### Create [token required]
- Endpoint: /orders
- HTTP verb: POST
- Request body: an order that has a status and userId
- Response body: The order that was created with id, status and userId
#### addProduct [token required]
- Endpoint: /orders/:id/products
- HTTP verb: POST
- Request body: quantity and productId of the product to be added to the order of id in the req.params
- Response body: The order_product that was created with id, quantity, orderId and productId
#### getProducts [token required]
- Endpoint: /orders/:id/products
- HTTP verb: GET
- Request body: N/A
- Response body: The order_products which exist in the order with the id in req.params
### Dashboard
#### complete-orders [token required]
- Endpoint: /users/:id/complete-orders
- HTTP verb: GET
- Request body: N/A
- Response body: all the orders with status 'complete' made by the user that has the id in the req.params 
#### current-order [token required]
- Endpoint: /users/:id/current-order
- HTTP verb: GET
- Request body: N/A
- Response body: The current active order (with status active) made by the user that has the id in the req.params 

## Data Shapes
#### Product
-  id
- name
- price

#### User
- id
- firstName
- lastName
- password

#### Order
- id 
- status
- userId

#### orderProduct (i.e. a product that exists in an order)
- id
- quantity 
- orderId
- productId


