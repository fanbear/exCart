const {Router} = require('express');
const Order = require('../controller/order');

const order = new Router();

order.get('/', Order.getAll);

module.exports = order;