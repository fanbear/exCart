const Product = require('../model/Product');
const convert = require('cyrillic-to-latin')


module.exports.getAll = async function(req, res) {
    try {
        const allProduct = await Product.find({}).lean();

        res.render('view/admin/product', {
            layout: 'dashboard',
            allProduct
        })
    } catch(e) {
        console.log(e);
    }
    
}

module.exports.add = function(req, res) {
    res.render('view/admin/productAdd', {layout: 'dashboard',})
}
module.exports.getByid = function(req, res) {
    res.send(200).json({attribute: 'get product id'});
}

module.exports.create = async function(req, res) {

    try {
        console.log(req.body);
        const createProduct = await new Product({
            seoUrl: !req.body.seourl ? convert(req.body.name).replace(' ', '_') : req.body.seourl,
            name: req.body.name,
            htmlTag: req.body.htmltag,
            metaTitle: req.body.metatitle,
            metaDesc: req.body.metadesc,
            desc: req.body.desc,
            count: req.body.count,
            price: !req.body.count ? "0" : req.body.count,
            priceIn: req.body.pricein,
            availability: req.body.availability,
            data: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            code: req.body.code,
            model: req.body.model,
        }).save();

        res.status(200).json({ massage: "Товар успешно добавлен ..."});
        //.redirect('/product?route=catalog/product');

    } catch(e) {
        console.log(e);
        res.status(409).json({massage: "Данные -> SEO url, должен быть уникальным"});
    }
    

    

}

module.exports.update = function(req, res) {
    res.send(200).json({attribute: 'change product'});
}

module.exports.remove = function(req, res) {
    res.send(200).json({attribute: 'delete product'});
}
