const session = require('express-session');
//if no session created, user will be redirected to main page
exports.redirectIndex = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/')

    } else { next() }
}
// Admin control
// exports.redirectProfile = (req, res, next) => {
//     if (!req.session.userType == 'admin') {
//         if (req.session.userType == 'Patient') {
//             res.redirect('/patientProfile')
//         } else {
//             res.redirect('/pathProfile')
//         }


//     } else { next() }
// }


//logout destroy session
exports.destroySession = (req, res, nex) => {
    req.session.destroy(function (err) {
        res.redirect('/')
    })
}