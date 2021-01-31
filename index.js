const express = require('express'); //инициализация express
const route = require('./routes/route'); //роутинг
const expHbs = require('express-handlebars'); //шаблонизатор
const authRoute = require('./routes/authRoute'); //login router
const mongoose = require('mongoose');
const path = require('path');

const PORT = process.env.PORT || 3015; //http://localhost:3000


const app = express(); //express initializate

//подключение шаблонизатора
const hbs = expHbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');


//midlevar
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/', authRoute); //авторизация


//ипользуем роут
app.use(route);





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

