module.exports.authCheck = function(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        return res.redirect("/admin");
    }
} 