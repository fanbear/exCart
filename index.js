const express = require('express'); //инициализация express
const expHbs = require('express-handlebars'); //шаблонизатор
const mongoose = require('mongoose');
const path = require('path');

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

//midlevar
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());


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



async function start() {
    try {
        await mongoose.connect('mongodb+srv://express-pizza:1q2w3e4r5t@cluster0.liqmm.mongodb.net/express-pizza', {
            useNewUrlParser: true,
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log('Server has ben Started')
        })
    } catch(e) {
        console.log(e);
    }
}

start();

