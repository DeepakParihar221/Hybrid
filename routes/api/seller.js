const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Catalog = require('../../models/Catalog');
const Product = require('../../models/Product');
const mongoose = require('mongoose');

// @route    POST api/seller/create-catalog
// @desc     Create catalog
// @access   private
router.post('/create-catalog', auth, async(req, res) => {
    // console.log(req.user.id);
    try {
        const sellerId = req.user.id;
        // console.log(sellerId);
        const user = await User.findById({_id: sellerId});
        if(user.role==='buyer'){
            return res.status(400).send({
                "msg": "Invalid User Access"
            });
        };

        var products = [];
        for(let i=0;i<req.body.product.length;i++){
            // console.log(product_name);
            let temp = await Product.find({product_name: req.body.product[i]});
            // console.log(temp);
            products.push(temp[0]);
        }
        const productIds = [];
        for(let i=0;i<products.length;i++){
            productIds.push(products[i].id);
        }
        // console.log(productIds);
        const catalog = new Catalog({
            sellerID: sellerId,
            products: productIds
        });
        try {
            await catalog.save();
        } catch (err) {
            return res.status(400).send({
                "msg": "Database Error"
            });
        }
        
        res.json(catalog);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route    POST api/seller/orders
// @desc     get orders
// @access   private
router.get('/orders', auth, async (req, res) => {
    try {
        const sellerId = req.user.id;
        // console.log(sellerId);
        const user = await User.findById({_id: sellerId});
        if(user.role==='buyer'){
            return res.status(400).send({
                "msg": "Invalid User Access"
            });
        };
        const id = mongoose.Types.ObjectId(sellerId);
        const orders = await Order.find({sellerID: id});
        res.json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;