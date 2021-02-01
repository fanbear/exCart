const {Router} = require('express');
const Option = require('../controller/option');

const option = new Router();

option.get('/', Option.getAll);

module.exports = option;