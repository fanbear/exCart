const {Router} = require('express');
const Category = require('../controller/category');

const category = new Router();

category.get('/', Category.getAll);

module.exports = category;