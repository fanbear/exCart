const {Schema, model} = require('mongoose');

// модель регистрации пользователя 
const Admin = new Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    role: {type: String, ref: 'Role'}
})

module.exports = model('Admin', Admin);