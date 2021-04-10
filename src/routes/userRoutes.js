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
        res.redirect('./AddUser.html');


    });
    app.get('/',(req,res) => {
        sess = req.session;
        if(sess.email) {
            return res.redirect('/');
        }
        res.redirect('index.html');
    });
    app.post('/adminSignIn', (req, res) => {
        user.signIn(req, res)
        console.log('signing admin In!')
        res.redirect('./Dashboard.html');

    });
    app.post('/pathSignIn', (req, res) => {
        user.signIn(req, res)
        console.log('signing pathologist In!')
        res.redirect('./pathProfile.html');

    });
    app.post('/pateSignIn', (req, res) => {
        user.signIn(req, res)
        console.log('signing patient In!')
        res.redirect('./patientProfile.html');
        
    });
    app.get("/onlineUser", async (req, res) => {
        
        user.getLoggedInUser(req,res)
        console.log("current User")

    });
    app.get('/logout',(req,res) => {
        req.session.destroy((err) => {
            if(err) {
                return console.log(err);
            }
            res.redirect('./index.html');
            console.log("user logged out")
        });
    
    });
    // app.route("/user/sign-in").post(signIn);
    app.route("/user/verify-email").post(verifyEmail);
    app.route("/user/forgot-password").post(forgotPassword);
    app.route("/user/change-password").patch(changePassword);
    app.route("/user/getUser").get(getUsersData);

}

module.exports = { routes, urouter };
