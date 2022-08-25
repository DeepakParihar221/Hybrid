const express = require('express');
const connectDB = require('./config/db');

const app = express();

//connect to database
connectDB();

//Init middleware
app.use(express.json());


//Buyers
//get all sellers
app.get('/api/buyer/list-of-sellers', (req, res) => {
    res.status(200).json({
        status: "success"
    });
});


//get seller catalog using seller id
app.get('/api/buyer/seller-catalog/:seller_id', (req, res) => {
    const id = req.params.id;
    const catalog = {product_id: 101, price: 100, seller_id: 1};
    res.status(200).json({
        status: "success",
        data: {
            seller_catalog : catalog
        }
    });
});


//Sellers
app.post('/api/seller/create-catalog', (req, res) => {
    res.send('Done');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})