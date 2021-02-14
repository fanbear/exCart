const { Router } = require('express');
const Product = require('../controller/product');
const auth = require('../midlleware/auth');

const product = new Router();

product.get('/', auth.authCheck, Product.getAll); //все товары
product.get('/add', auth.authCheck, Product.add); //добавление товара карточка
product.post('/add', auth.authCheck, Product.create); //добавление товара обработчик
product.get('/:id', Product.getByid);
product.patch('/:id', Product.update);
product.delete('/:id', Product.remove);

module.exports = product;