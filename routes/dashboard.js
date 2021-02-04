const { Router } = require('express');
const Dashboard = require('../controller/dashboard');
const passport = require('passport');

const dashboard = new Router();


//панель администратора
dashboard.get('/', Dashboard.dashboard);

module.exports = dashboard;