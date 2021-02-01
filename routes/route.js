const {Router} = require('express');


const route = Router();

///главная страница
route.get('/', (req, res) => {
    res.render('view/index', ({}));
})

module.exports = route;