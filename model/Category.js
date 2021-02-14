const {Schema, model} = require('express');

const category = new Schema({

    name: {type: String, required: true},
    seoName: {type: String, required: true, unique: true}
});

