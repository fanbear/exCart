const passport = require('passport');

//контролер авторизации админа
module.exports.login =  function(req, res) {
    res.render('view/auth',  ({layout: 'auth'}));
};

module.exports.auth = function(req, res, next) {
    passport.authenticate('local',
        function(err, user, info) {
        return err 
            ? next(err)
            : user
            ? req.logIn(user, function(err) {
                return err
                    ? next(err)
                    : res.redirect('/dashboard');
            })
            : res.redirect('/admin' + req.user.login);
    }
    )(req, res, next);
};

module.exports.logout = function(req, res) {
    req.logOut();
    res.status(200).clearCookie('connect.sid', {
        path: '/'
    });
    req.session.destroy(function (err) {
        res.redirect('/');
    });
};