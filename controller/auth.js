const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

//контролер авторизации админа
module.exports.login =  function(req, res) {
    res.render('view/auth',  ({layout: 'auth'}));
}

module.exports.auth = async function(req, res) {

    // const admin = new User();
    // const salt = bcrypt.genSaltSync(10);
    // const password = 'admin';
    // admin.login = 'admin';
    // admin.password = bcrypt.hashSync(password, salt);
    // admin.save();

    const candidate = await User.findOne({login: req.body.login});

    if(candidate) {
        const passwordTrigger = bcrypt.compareSync(req.body.password, candidate.password);

        if (passwordTrigger) {

            const token = jwt.sign({
                login: candidate.login,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60});

            res.status(200).json({ 
                token: `Bearer ${token}`
            })
        } else {
            //Пароли не совпали
            res.status(401).json({
                massege: 'Пароль не верный'
            })
        }
        
    } else {
        //Логин не совпал
        res.status(404).json({
            massege: 'Такого пользователя не существует'
        })
    }
    // 
    
}