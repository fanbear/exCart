const { Schema, model } = require('mongoose');

const Product = new Schema ({
    productName: {type: String, required: true, default: "Product1"},
    productDesc: {type: String},
    productImage: {type: String},
    productCount: {type: Number},
    productPrice: {type: Number}
})

module.exports = model('Product', Product);