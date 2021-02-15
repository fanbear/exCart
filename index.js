const express = require('express'); //инициализация express
const expHbs = require('express-handlebars'); //шаблонизатор
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const Session = require('express-session');
const FileStore = require('session-file-store')(Session);

const keys = require('./config/keys');
const Routes = require('./routes/route'); //роутинг
const authRoutes = require('./routes/auth'); //роутер логина
const dashboardRoutes = require('./routes/dashboard'); //роутер панели администратора
const attributeRoutes = require('./routes/attribute'); //роутер атрибутов
const categoryRoutes = require('./routes/category'); //роутер категорий
const optionRoutes = require('./routes/option'); //роутер опций
const orderRoutes = require('./routes/order'); //роутер заказов
const productRoutes = require('./routes/product'); //роутер товаров

const PORT = process.env.PORT || 3015; //http://localhost:3015
const app = express(); //express initializate

//подключение шаблонизатора
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

mongoose.connect(keys.mongoURI)
    .then( () => console.log('MongoDB connected.'))
    .catch( error => console.log(error))


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


app.use(require('morgan')('dev'));
app.use(express.json({
    extended: true,
    inflate: true,
    parameterLimit: 1000,
    type: 'application/json',
    verify: undefined
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.use(require('cors')());

//passport auth
app.use(Session({
    secret: 'q4w5qew4',
    store: new FileStore(),
    cookie: {
        path: '/',
        httpOnly: false,
        maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
}));

app.use(cookieParser());
require('./midlleware/passport');

app.use(passport.initialize());
app.use(passport.session());


//backend
app.use('/', authRoutes); //авторизация админа
app.use('/dashboard', dashboardRoutes); //роутинг панели администратора
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/attribute', attributeRoutes); 
app.use('/option', optionRoutes);
app.use('/order', orderRoutes);


//frontend
app.use(Routes);


function start() {

    app.listen(PORT, () => {
        console.log('Server has ben Started')
    })
}

start();

