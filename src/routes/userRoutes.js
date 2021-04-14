const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData } = require('../controllers/userController');
const user = require('../controllers/userController');
const urouter = express.Router();

const routes = (app) => {
    // app.route('/user')
    //     .post(addUser)
    app.route('/add-user').post(addUser)
    // app.get('/AddUser.html#error', async (req, res) => {
    //     const errors = req.session.add ? req.session.add.errors : false
    //     console.log(errors);
    //     req.session.add = {};
    //     res.send('Hi')
    // });
    app.route("/user/sign-in").post(signIn);
    app.route("/user/verify-email").post(verifyEmail);
    app.route("/user/forgot-password").post(forgotPassword);
    app.route("/user/change-password").patch(changePassword);
    app.route("/user/getUser").get(getUsersData);

}

module.exports = { routes, urouter };
