//Контролер авторизации админа и получения прав админа, менеджер

const Admin = require('../model/Admin'); //модель логина администратора
const Role = require('../model/Role'); //модель ролей пользователя
const jwt = require('jsonwebtoken'); //хранилище токенов
const {secret} = require('../config/config'); //секретный ключ

const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, { expiresIn : '24h'})
}
class authController {
    //авторизация
    async login(req, res) {
        try {
            const {username, password} = req.body;
            const admin = await Admin.findOne({username: username});
            const validPassword = admin.password == password ? true : false;
            console.log("ok");
            const token = generateAccessToken(admin._id, admin.role);

            if (!admin) {
                return res.status(400).json({ message: `Login ${username} not found`})
            }
            
            if (!validPassword) {
                return res.status(400).json({ message: `Password ${password} not correct`})
            }

            res.redirect('/panel');
            return res.json({token});

        } catch(e) {
            console.log(e);
            res.status(400).json({message: "Login error"});
        }
    }
    
    //проверка прав пользователя
    async getUsers(req, res) {
        try {
            // const admin = new Admin({ username : 'admin', password: 'admin', role: 'Admin'});
            // await admin.save();
            res.json('server work')
        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();