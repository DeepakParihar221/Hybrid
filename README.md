# Hybrid

### step 1
npm install

### step 2
node start

Auth APIs
1) Register User -> Type: Post
- http://localhost:3000/api/auth/register

Data to be passed.
{
    "name": "Test5",
    "email": "test5@gmail.com",
    "password": "12345678",
    "role": "buyer"
}

Role can be "seller" or "buyer"

2) Login User -> Type: Post
- http://localhost:3000/api/auth/login

Data to be passed.
{
    "email": "test2@gmail.com",
    "password": "12345678",
    "role": "seller"
}


Seller APIs
1) Create Catalog -> Type: Post
- http://localhost:3000/api/seller/create-catalog

Headers required -> Use Token generated in register api because all other users have their catalog in database and pass as x-auth-token
Data to be passed.
{
    "product": ["mac book"]
}

2) Get all orders -> Type: Get
- http://localhost:3000/api/seller/orders

Headers required -> Use Token generated in login api and pass as x-auth-token


Buyer APIs
1) Get list of sellers
- http://localhost:3000/api/buyer/list-of-sellers

Headers required -> Use Token generated in login api and pass as x-auth-token
We need a buyer's token so change the data in login api with the below given data
{
    "email": "test1@gmail.com",
    "password": "12345678",
    "role": "buyer"
}

2) Get a seller's catalog
- http://localhost:3000/api/buyer/seller-catalog/6308d62c1e796befb16923b6

Headers required -> Use Token generated in login api and pass as x-auth-token
We need a buyer's token so change the data in login api with the below given data
{
    "email": "test1@gmail.com",
    "password": "12345678",
    "role": "buyer"
}

3) Create order
- http://localhost:3000/api/buyer/create-order/6308d6361e796befb16923b9

Headers required -> Use Token generated in login api and pass as x-auth-token
We need a buyer's token so change the data in login api with the below given data
{
    "email": "test1@gmail.com",
    "password": "12345678",
    "role": "buyer"
}

Data to be passed.
{
    "product": ["mac book"]
}


