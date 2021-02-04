const { Router } = require('express');
const Dashboard = require('../controller/dashboard');
const auth = require('../midlleware/auth');

const dashboard = new Router();


//панель администратора
dashboard.get('/', auth.authCheck, Dashboard.dashboard);

module.exports = dashboard;