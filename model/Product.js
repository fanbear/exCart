const { Schema, model } = require('mongoose');

const product = new Schema ({
    seoUrl: { type: String, unique: true },
    name: { type: String, default: 'no name'},
    htmlTag: { type: String },
    metaTitle: { type: String },
    metaDesc: { type: String },
    desc: { type: String },
    manufacturer: {type: String},
    image: { type: String },
    count: { type: Number },
    price: { type: Number },
    priceIn: { type: Number },
    availability: {type: String, default: "in" },
    data: { type: String },
    code: {type: String },
    model: {type: String },
    category: { type: String },
    attribute: {type: Array}
    //showInCategory: [{categoryIn: { type: String }}]
})

module.exports = model('Product', product);