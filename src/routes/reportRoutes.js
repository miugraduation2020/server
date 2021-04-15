
const express = require('express');
const session = require('express-session');

const report = require('../controllers/reportController');
const urouter = express.Router();
var sess;




const repRoutes = (app) => {

    /*Generate Report*/

    app.post('/genrep', (req, res) => {
        report.genReport(req, res)
        console.log("repgens")
        console.log('Generating Report')
        res.redirect('./report.html');


    });


   

}

module.exports = { repRoutes };
