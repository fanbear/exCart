const {Router} = require('express');
const Category = require('../controller/category');

const category = new Router();

category.get('/', Category.getAll);
category.post('/', Category.create);
category.get('/:id', Category.getByid);
category.patch('/:id', Category.update);
category.delete('/:id', Category.remove);

module.exports = category;