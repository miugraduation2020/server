const { addUser } = require('../controllers/userController')

const routes = (app) => {
    app.route('/user')
        .post(addUser)
    app.route('/user/:ID')
        .put((req, res) =>
            res.send('Put request SUCCESS')
        )
        .delete((req, res) =>
            res.send('delete request SUCCESS')
        )
}

module.exports = routes;
