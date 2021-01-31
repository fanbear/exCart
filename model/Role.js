const {Schema, model} = require('mongoose');

// модель ролей пользователя
const Role = new Schema({
    username: { type: String, unique: true, default: "Manager" }
})

module.exports = model('Role', Role);