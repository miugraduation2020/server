const { addNewContact, getContcats } = require('../controllers/crmController')

const routes = (app) => {
    app.route('/contact')
        .get(getContcats)
        .post(addNewContact);
    app.route('/contact/:contactID')
        .put((req, res) =>
            res.send('Put request SUCCESS')
        )
        .delete((req, res) =>
            res.send('delete request SUCCESS')
        )
}
module.exports = routes;
