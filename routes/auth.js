const Router = require('express');
const controller = require('../controller/auth');


const router = new Router();

//http://localhost://admin/
router.get('/admin', controller.login); //рендер страницы авторизации
//http://localhost://login
router.post('/login', controller.auth); //обратотка авотризации
//http://localhost://logout
router.get('/logout', controller.logout);

module.exports = router; 