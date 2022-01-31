# Storefront Backend Project
## Overview
This is a RESTful API that serves as the backend for a storefront. It provides all the functionality needed for an online
store

## Used Technologies
This application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Instructions
- In the command prompt, write the following command: 
`psql -U postgres`
- Enter your password for the postgres user
- In psql run the following:
  `CREATE USER full_stack_user WITH PASSWORD 'password123';`
  `CREATE DATABASE storefront_backend;`
  `CREATE DATABASE storefront_backend_test;`
  `GRANT ALL PRIVILEGES ON DATABASE storefront_backend TO full_stack_user;`
  `GRANT ALL PRIVILEGES ON DATABASE storefront_backend_test TO full_stack_user;`
- In psql, to view the tables created in the development database, use the following commands:
`\c storefront_backend`
`\dt`
- In psql, to view the tables created in the test database, use the following commands:
`\c storefront_backend`
`\dt`
- Open this project in Visual Studio Code and use npm install to install all the project dependencies 
- Use `npm run reset` to make sure the database is reset and do the up migrations  
- Use `npm run test` to run the jasmine testing
- Use `npm run dev` or `npm run start` to start the server 
- Create a .env file with the environment variables. My environment variables are:
POSTGRES_HOST= 127.0.0.1
POSTGRES_DB= storefront_backend
POSTGRES_TEST_DB= storefront_backend_test
ENV=dev
POSTGRES_USER= full_stack_user
POSTGRES_PASSWORD= password123
BCRYPT_PASSWORD= my_deep_secret
SALT_ROUNDS=10
TOKEN_SECRET= my_token_secret
PORT= 3000
- The server runs on port 3000 || process.env.PORT 
## Scripts
### lint
use npm run lint to run eslint.
### lint:f
use npm run lint:f to run eslint and fix problems. 
### prettier
use npm run prettier to fix prettier errors
### reset
use npm run reset to reset all the migrations and then do the up migrations (db-migrate reset and then db-migrate up)
### dev
use npm run dev to run the typescript index file in the src folder with nodemon
### build
npm run build will create the build folder that contains the transpiled JS codes
### start
npm run start will build the code and run the built project
### test
npm run test will do the following : 
- sets the environment to be a test environment.
- resets the migrations of the test database and then does its up migrations 
- builds the project then runs jasmine on the build JS files
- drops the test database after testing