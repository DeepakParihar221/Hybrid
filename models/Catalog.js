const mongoose = require('mongoose');

const catalogSchema = new mongoose.Schema({
    sellerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }]
});

module.exports = Catalog = mongoose.model('catalog', catalogSchema);