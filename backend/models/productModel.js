const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    type: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }],
    description: {
        type: String
    },
    vendor: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
    },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;