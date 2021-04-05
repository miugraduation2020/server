const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData } = require('../controllers/userController')

const routes = (app) => {
    app.route('/user')
        .post(addUser);
    app.route("/user/sign-in").post(signIn);
    app.route("/user/verify-email").post(verifyEmail);
    app.route("/user/forgot-password").post(forgotPassword);
    app.route("/user/change-password").patch(changePassword);
    app.route("/user/getUser").get(getUsersData);

}

module.exports = routes;
