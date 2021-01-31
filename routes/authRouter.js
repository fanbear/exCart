const Router = require('express');
const controller = require('../controller/authController');

//прослушка роутов типа post, get
const router = new Router();

router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router; 