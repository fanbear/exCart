const Product = require('../model/Product');
const fs = require('mz/fs');
const convert = require('cyrillic-to-latin')
const moment = require('moment');

module.exports.getAll = async function(req, res) {
    try {
        const allProduct = await Product.find({}).lean();
        const lang = moment().locale("ru");
        const date = lang.format('dddd, LL');
        
        res.render('view/admin/product', {
            layout: 'dashboard',
            allProduct,
        })
    } catch(e) {
        console.log(e);
    }
    
}

module.exports.add = async function(req, res) {
    
    try {
        const file = await fs.readdir('./public/uploads');

        file.shift();
        res.render('view/admin/productAdd', {
            layout: 'dashboard',
            file
        })
    } catch(err) {
        console.log(err);
    }
    
}
module.exports.getByid = function(req, res) {
    res.send(200).json({attribute: 'get product id'});
}
module.exports.image = function(req, res) {
    
    try {
        const filedata = req.file.path;

        if (!filedata) {
            res.status(400).json({massage : "Файл не загружен"});
        } else {
            res.status(201).json({ massage: 'Файл Загружен', url : filedata});
        }

    } catch(err) {
        console.log(err);
    }
}

module.exports.create = async function(req, res) {
    
    try {
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
            data: moment().format('DDMMYYYY'),
            code: req.body.code,
            model: req.body.model,
            attribute: req.body.attribute,
            image: req.body.img_src
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
