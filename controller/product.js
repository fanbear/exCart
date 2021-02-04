const product = require('../model/Product');


module.exports.getAll = function(req, res) {
    res.render('view/admin/product', {
        layout: 'dashboard',
    })
}

module.exports.getByid = function(req, res) {
    res.send(200).json({attribute: 'get product id'});
}

module.exports.create = function(req, res) {
    res.send(200).json({attribute: 'create product'});
}

module.exports.update = function(req, res) {
    res.send(200).json({attribute: 'change product'});
}

module.exports.remove = function(req, res) {
    res.send(200).json({attribute: 'delete product'});
}
