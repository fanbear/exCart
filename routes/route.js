const {Router} = require('express');


const route = Router();

///главная страница
route.get('/', (req, res) => {
    res.render('view/index', ({}));
})
///страница авторизации в админ панель
route.get('/admin', (req, res) => {
    res.render('view/auth',  ({layout: 'auth'}));
})

///панель администратора
route.get('/admin/panel', (req, res) => {
    res.render('view/panel', ({layout: 'adminPanel'}))
})

module.exports = route;