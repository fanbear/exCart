module.exports.getAll = function(req, res) {
    res.status(200).json({attribute: 'category page'});
}

module.exports.getByid = function(req, res) {
    res.sendStatus(200).json({attribute: 'get category id'});
}

module.exports.create = function(req, res) {
    res.sendStatus(200).json({attribute: 'create category'});
}

module.exports.update = function(req, res) {
    res.sendStatus(200).json({attribute: 'change category'});
}

module.exports.remove = function(req, res) {
    res.sendStatus(200).json({attribute: 'delete category'});
}