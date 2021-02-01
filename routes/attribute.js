const {Router} = require('express');
const Attribute = require('../controller/attribute');

const attribute = new Router();

attribute.get('/', Attribute.getAll);

module.exports = attribute;