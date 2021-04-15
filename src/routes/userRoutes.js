// const e = require('express');
// const express = require('express');
// const session = require('express-session');

// const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData } = require('../controllers/userController')
// const user = require('../controllers/userController');
// const urouter = express.Router();
// var sess;


// const routes = (app) => {

//     /*Add User*/

//     app.post('/addUser', (req, res) => {
//         user.addUser(req, res)
//         console.log('adding a user!')
//         res.redirect('./AddUser.html');


//     });

//     /*Admin Login*/

//     app.post('/adminSignIn', (req, res) => {
//         user.signIn(req, res)
//         if (res != 200) { console.log('err') } else
//          {   

//         console.log('signing admin In!')
//         sess = req.session;
//         sess.email = req.body.email;
//         console.log("session created")
//         console.log(sess.email)
//         res.redirect('./Dashboard.html');}

//     });

//     /*Pathologist Login*/

//     app.post('/pathSignIn', (req, res) => {
//         user.signIn(req, res)
//         console.log('signing pathologist In!')
//         sess = req.session;
//         sess.email = req.body.email;
//         console.log("session created")
//         console.log(sess.email)
//         res.redirect('./pathProfile.html');

//     });

//     /*Patients Login*/

//     app.post('/pateSignIn', (req, res) => {
//         user.signIn(req, res)
//         console.log('signing patient In!')
//         sess = req.session;
//         sess.email = req.body.email;
//         console.log("session created")
//         console.log(sess.email)
//         res.redirect('./patientProfile.html');

//     });

//     /*Logout*/

//     app.get('/logout', (req, res) => {
//         req.session.destroy((err) => {
//             if (err) {
//                 return console.log(err);
//             }
//             res.redirect('./index.html');
//             console.log("user logged out")
//         });

//     });

//     app.get('/getuser', (req, res) => {
//         user.getUsersData(req, res);
//     })


//     app.get('/getall', (req, res) => {
//         user.getUsers(req, res);
//     })

//     app.get('/getpath', (req, res) => {
//         user.getPathologists(req, res);
//     })

//     app.get('/getpat', (req, res) => {
//         user.getPatients(req, res);
//     })




//     // app.post('/profile', (req, res) => {
//     //     user.updateUI(req, res)
//     //     console.log('updating uifor a user!')
//     //     res.redirect('./profile.html');


//     // });

//     // app.get("/onlineUser", async (req, res) => {

//     //     user.getLoggedInUser(req, res)
//     //     console.log("current User")

//     // });
//     // app.route("/user/sign-in").post(signIn);
//     app.route("/user/verify-email").post(verifyEmail);
//     app.route("/user/forgot-password").post(forgotPassword);
//     app.route("/user/change-password").patch(changePassword);
//     app.route("/user/getUser").get(getUsersData);

// }

// module.exports = { routes, urouter };
