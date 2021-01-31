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
            const token = generateAccessToken(admin._id, admin.role);

            if (!admin) {
                return res.status(400).json({ message: `Login ${username} not found`})
            }
            
            if (!validPassword) {
                return res.status(400).json({ message: `Password ${password} not correct`})
            }

            res.redirect('/admin/panel');
            return res.json({token});

        } catch(e) {
            console.log(e);
            res.status(400).json({message: "Login error"});
        }
    }
}

module.exports = new authController();