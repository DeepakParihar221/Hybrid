const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    buyerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    products: [{
        type: String,
        required: true
    }]
});

module.exports = Order = mongoose.model('order', orderSchema);