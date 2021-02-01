const { Router } = require('express');
const Product = require('../controller/product');

const product = new Router();
//страница продукта
product.get('/', Product.getAll);

//страница добавления продукта
product.get('/product/add', (req, res) => {
    res.render('veiw/admin/addProduct', {
        layout: 'adminPanel',
    })
})

module.exports = product;