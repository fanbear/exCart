const { Router } = require('express');
const Product = require('../controller/product');

const product = new Router();

product.get('/', Product.getAll);
product.post('/', Product.create);
product.get('/:id', Product.getByid);
product.patch('/:id', Product.update);
product.delete('/:id', Product.remove);

module.exports = product;