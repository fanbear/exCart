const {Router} = require('express');


const route = Router();

///главная страница
route.get('/', (req, res) => {
    res.render('index', ({}));
})
///страница авторизации в админ панель
route.get('/admin', (req, res) => {
    res.render('auth',  ({layout: 'auth'}));
})

///панель администратора
route.get('/panel', (req, res) => {
    res.render('panel', ({layout: 'adminPanel'}))
})

module.exports = route;