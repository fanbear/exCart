//контролер авторизации админа
module.exports.login = function(req, res) {
    res.render('view/auth',  ({layout: 'auth'}));
}
module.exports.auth = function(req, res) {
    res.redirect('/dashboard');
}