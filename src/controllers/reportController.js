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
const { getMyPatients } = require('./pathologistController');
const User = mongoose.model('User', UserSchema);


exports.genReport = async (req, res) => {

    const reportID = req.body.viewreport;
    const report = await Report.findById(reportID);
    const patient = await User.findById(report.patientID);
    const pathologist = await User.findById(report.pathologistID)
    const image = await Image.findById(report.imageID)
    const diagnosis = await Tumor.findOne().where("tumorClassNumber").equals(report.tumorID);
    console.log("checkoo:" + diagnosis.tumorName)
    console.log("checkoscqfo:" + report.tumorID)


    return res.render(
        "report",
        {
            patient: `${patient.firstName}  ${patient.lastName}`,
            patientDOB: patient.dateOfBirth,
            patientGender: patient.gender,
            pathologist: `Dr. ${pathologist.firstName} ${pathologist.lastName}`,
            diagnosis: diagnosis.tumorName,
            diagnosisDescription: diagnosis.tumorDescription,
            date: report.genDate,
            pathologistNote: report.pathComments,
            user: req.user,
        }
    );






}

exports.addNewReport = async (patientID, pathologistID, tumorID, imageID, approved) => {

    const genDate = Date.now();
    const newReport =
        new Report(
            {
                genDate,
                patientID,
                pathologistID,
                tumorID,
                imageID,
                approved
            }
        )
    await newReport.save().then(newReport => console.log("new Report add:" + newReport._id));
    console.log(
        patientID + ' &$% ' +
        pathologistID + ' &$% ' +
        tumorID + ' &$% ' +
        imageID + '&$%' + approved)


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
    return res.render("adminReportsList", { reports: allRep, user: req.user });
}


/* Get Pathologist Reports*/

exports.getPathReports = async (req, res) => {
    userID = req.user._id;
    userType = req.user.type;
    console.log(' check #1:' + userID + ' check #2:' + userType)
    const reports = await this.getUserReports(userID, userType)
    console.log("check #3: " + reports[0])
    return res.render("pathReportsList", { reports: reports });
}


exports.getUserReports = async (ID, userType) => {

    userID = '';
    if (userType == "Pathologist") {
        userID = 'pathologistID'
        // console.log("check: user report")
    }
    else {
        userID = 'patientID'
    }
    const reports = await Report.find().where(userID).equals(ID);
    // console.log(reports[0] )
    return reports;

}

/* Get Pathologist Reports*/

exports.getPateReports = async (req, res) => {
    var approvedreports = [];
    userID = req.user._id;
    userType = req.user.type;
    console.log(' check #1:' + userID + ' check #2:' + userType)
    const reports = await this.getUserReports(userID, userType)
    console.log("check #3: " + reports[7].approved)
    reports.forEach(element => {
        console.log(element.approved);
        if (element.approved == true) {
            approvedreports.push(element)
        }
    });
    console.log(approvedreports);
    return res.render("patientReportsList", { reports: approvedreports, user: req.user });

}

exports.getPathPatientRep = async (req, res) => {
    userID = req.body.patient;
    userType = 'Patient';
    console.log(' check #1:' + userID + ' check #2:' + userType)
    const reports = await this.getUserReports(userID, userType)
    console.log("check #3: " + reports[0])
    return res.render("pathPatientsReports", { reports: reports, user: req.user });

}

exports.reportReview = async (req, res) => {

    userID = req.user._id
    reportID = req.body.repID;
    const report = await Report.findById(reportID);
    const patient = await User.findById(report.patientID);
    const pathologist = await User.findById(report.pathologistID)
    const diagnosis = await Tumor.findOne().where("tumorClassNumber").equals(report.tumorID);
    return res.render(
        "addReportReview",
        {
            patient: `${patient.firstName} & ${patient.lastname}`,
            patientDOB: patient.dateOfBirth,
            patientGender: patient.gender,
            pathologist: `Dr. ${pathologist.firstName} ${pathologist.lastName}`,
            diagnosis: diagnosis.tumorName,
            diagnosisDescription: diagnosis.tumorDescription,
            date: report.genDate,
            pathologistNote: report.pathComments,
            reportID: reportID,
            user: req.user
        }
    );



}

exports.addReview = async (req, res) => {

    pathologistID = req.user._id;
    reportID = req.body.id;
    comments = req.body.comments;

    console.log("check#: " + pathologistID)
    console.log("check#: " + reportID)

    const report = await Report.findByIdAndUpdate(reportID, { pathComments: comments })
    return res.redirect('pathReportsList')
}


exports.approveReport = async (req, res) => {

    pathologistID = req.user._id;
    reportID = req.body.repID;
    aprv = req.body.aprvbtn;



    if (aprv == "Approve") {
        const report = await Report.findByIdAndUpdate(reportID, { approved: true })

    }
    else {
        const report = await Report.findByIdAndUpdate(reportID, { approved: false })
    }
    userID = req.body.patID;
    userType = 'Patient';
    const reports = await this.getUserReports(userID, userType)
    return res.render("pathPatientsReports", { reports: reports, user: req.user });
}

//get all reports
//get a report
// edit a report
//download report 
// path comments / notes 
