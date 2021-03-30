const { addUser, signIn, verifyEmail, forgotPassword, changePassword } = require('../controllers/userController')

const routes = (app) => {
    app.route('/user')
        .post(addUser);
    app.route("/user/signIn").post(signIn);
    app.route("/user/verify-email").post(verifyEmail);
    app.route("/user/forgot-password").post(forgotPassword);
    app.route("/user/change-password").patch(changePassword);
}

module.exports = routes;
