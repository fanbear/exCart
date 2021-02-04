const {Router} = require('express');
const Category = require('../controller/category');
const passport = require('passport');

const category = new Router();

category.get('/', passport.authenticate('jwt', {session: false}), Category.getAll);
category.post('/', Category.create);
category.get('/:id', Category.getByid);
category.patch('/:id', Category.update);
category.delete('/:id', Category.remove);

module.exports = category;