const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./userController');
const { ReportSchema } = require('../models/reportModel');
const Report = mongoose.model('Report', ReportSchema);

var pathologist = users.getUsersData();

exports.genReport = async (req, res) => {

    const genDate = new Date();
    const pathID =pathologist.id;
    const patID = req.body.patID;
    const tumorID = req.body.tumorID;
    const imageID = req.body.imageID;


    const newReport = new Report({
        genDate,
        patID,
        pathID,
        tumorID,
        imageID,
    })

    await newReport.save().then(newReport => {
        console.log("Generating a Report")
    }

    )

}
//get all reports
//get a report
// edit a report
//download report 
