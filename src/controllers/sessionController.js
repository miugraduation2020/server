const session = require('express-session');

exports.redirectIndex = (req, res, next) => {
    if (!req.session.userID) {
        res.redirect('/')

    } else { next() }
}