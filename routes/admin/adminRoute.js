const { Router } = require('express');
const product = require('../../controller/admin/Product');

const adminRoute = new Router();

adminRoute.get('/admin/panel/product', async (req, res) => {

    const productList = await product.getProduct();

    res.render('view/admin/product', {
        layout: 'adminPanel',
        isProduct: true,
        productList
    })
})

module.exports = adminRoute;