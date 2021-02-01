module.exports.dashboard = function(req, res) {
    const statistic = [
        {
            product: '5 sale'
        }
    ]
    res.render('view/admin/dashboard', ({
        layout: 'dashboard',
        statistic
    }));
}
