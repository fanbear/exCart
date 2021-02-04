const Router = require('express');
const controller = require('../controller/auth');

//прослушка роутов типа post, get
const router = new Router();

//http://localhost://api/auth/login
router.get('/admin', controller.login); //рендер страницы авторизации
router.post('/login', controller.auth); //обратотка авотризации



module.exports = router; 