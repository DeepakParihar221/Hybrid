const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = Product = mongoose.model('product', productSchema);