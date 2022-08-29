const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const auth = require('../../middleware/auth');
const Catalog = require('../../models/Catalog');
const User = require('../../models/User');
const Order = require('../../models/Order');


// @route    GET api/buyer/list-of-sellers
// @desc     get list of sellers
// @access   private
router.get('/list-of-sellers', auth, async (req, res) => {

    try {
      const user = await User.find({role: "seller"});
      console.log(user);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


  // @route    GET api/buyer/seller-catalog/:seller_id
  // @desc     get sellers catalog
  // @access   private
  router.get('/seller-catalog/:seller_id', auth, async (req, res) => {
    try {
        const user = await User.findById({_id: req.user.id});
        if(user.role==='seller'){
            return res.status(400).send({
                "msg": "Invalid User Access"
            });
        };
        //Assuming buyer will send seller id only through params
        //so no double check on id that it 
        //belongs to seller itself
        const sellerID = req.params.seller_id;
        var id = mongoose.Types.ObjectId(sellerID);
        // console.log(id);
        const catalog = await Catalog.findOne({sellerID: id});
        // console.log(catalog);
        res.json(catalog);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  });


  // @route    GET api/buyer/create-order/:seller_id
  // @desc     create orders
  // @access   private
  router.post('/create-order/:seller_id', auth, async (req, res) => {
    try {
        var buyerID = req.user.id;
        const user = await User.findById({_id: buyerID});
        if(user.role==='seller'){
            return res.status(400).send({
                "msg": "Invalid User Access"
            });
        };

        const id = req.params.seller_id;
        const sellerID = mongoose.Types.ObjectId(id);
        const products = req.body.products;

        const order = new Order({
            sellerID,
            buyerID,
            products
        });

        try {
            await order.save();
        } catch (err) {
            return res.status(400).send({
                "msg": "Database Error"
            });
        }
        res.json(order);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
  })

  module.exports = router;