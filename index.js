const express = require('express'); //инициализация express
const expHbs = require('express-handlebars'); //шаблонизатор
const mongoose = require('mongoose');
const keys = require('./config/keys');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');

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

app.use(passport.initialize())
require('./midlleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(require('cors')());


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

