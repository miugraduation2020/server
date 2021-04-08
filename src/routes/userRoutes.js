const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData } = require('../controllers/userController')
const user = require('../controllers/userController');
const urouter = express.Router();



const routes = (app) => {
    // app.route('/user')
    //     .post(addUser);
    app.post('/addUser', (req, res) => {
        user.addUser(req, res)
        console.log('adding a user!')

    });
  
    app.route("/user/sign-in").post(signIn);

    app.route("/user/verify-email").post(verifyEmail);
    app.route("/user/forgot-password").post(forgotPassword);
    app.route("/user/change-password").patch(changePassword);
    app.route("/user/getUser").get(getUsersData);

}

module.exports = { routes, urouter };
