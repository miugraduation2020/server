const { addFAQ } = require('../controllers/FAQController')

const routes = (app) => {
    app.route('/addfaq')
        .post(addFAQ);


}

module.exports = routes;
