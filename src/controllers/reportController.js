const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./userController');
const { ReportSchema } = require('../models/reportModel');
const Report = mongoose.model('Report', ReportSchema);
const { ImageSchema } = require('../models/imagesModel')
const Image = mongoose.model('Image', ImageSchema)
const { TumorSchema } = require('../models/tumorModel')
const Tumor = mongoose.model('Tumor', TumorSchema)
const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);


exports.genReport = async (req, res) => {

    const reportID = req.body.viewreport;
    const report = await Report.findById(reportID);
    const patient = await User.findById(report.patientID)
    const pathologist = await User.findById(report.pathologistID)
    const image = await Image.findById(report.imageID)
    const diagnosis = await Tumor.findOne().where("tumorClassNumber").equals(report.tumorID);
    console.log("check:"+diagnosis.tumorName)

    return res.render(
        "report",
        {
            patient: `${patient.firstName} & ${patient.lastname}`, 
            patientDOB:patient.dateOfBirth,
            patientGender:patient.gender,
            pathologist:`Dr. ${pathologist.firstName} ${pathologist.lastName}`,
            diagnosis:diagnosis.tumorName,
            diagnosisDescription:diagnosis.tumorDescription,
            date: report.genDate,
            pathologistNote: report.pathComments,
        }
    );
        





}

exports.addNewReport = async (patientID, pathologistID, tumorID, imageID) => {

    const genDate = Date.now();
    const newReport =
        new Report(
            {
                genDate,
                patientID,
                pathologistID,
                tumorID,
                imageID,
            }
        )
    await newReport.save().then(newReport => console.log("new Report add:" + newReport._id));
    console.log(
        patientID + ' &$% ' +
        pathologistID + ' &$% ' +
        tumorID + ' &$% ' +
        imageID)


}

exports.getReports = async (req, res) => {
    var allReports;
    currentUser = req.user;
    if (req.user.type != "Pathologist") {
        allReports = await Report.find().where('pathologistID').equals(currentUser);
        console.log("check#1")
    }
    else {
        allReports = await Report.find().where('patientsID').equals(currentUser);
        console.log("check#2")

    }
    console.log("check#3")

    return res.render("profile", { reports: allReports });
}


/*Get All Reports*/

exports.getAllReports = async (req, res) => {

    const allRep = await Report.find({})
    //console.log("check1: " + allRep[0]);
    return res.render("adminReportsList", { reports: allRep });
}





//get all reports
//get a report
// edit a report
//download report 
// path comments / notes 