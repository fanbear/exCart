const { Router } = require('express');
const Dashboard = require('../controller/dashboard');

const dashboard = new Router();

//панель администратора
dashboard.get('/', Dashboard.dashboard);

module.exports = dashboard;