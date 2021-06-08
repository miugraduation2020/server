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
    // console.log("check:" + diagnosis.tumorName)

    return res.render(
        "report",
        {
            patient: `${patient.firstName} & ${patient.lastname}`,
            patientDOB: patient.dateOfBirth,
            patientGender: patient.gender,
            pathologist: `Dr. ${pathologist.firstName} ${pathologist.lastName}`,
            diagnosis: diagnosis.tumorName,
            diagnosisDescription: diagnosis.tumorDescription,
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

/* Get Pathologist Reports*/

exports.getPathReports = async (req, res) => {
    userID = req.user._id;
    userType = req.user.type;
    console.log(' check #1:'+userID+' check #2:'+userType)
    const reports= await this.getUserReports(userID,userType)
    console.log("check #3: "+reports[0])
    return res.render("pathReportsList", { reports: reports });
}
// exports.getPathRepProfile = async (req, res) => {

//     userID = req.user._id;
//     userType = req.user.type;
//     console.log(+' check #1:'+userID+' check #2:'+userType)
//     const reports= await getUserReports(userID,userType)
//     console.log("check #3: "+reports[2])
//     res.render("pathProfile", { reports: reports });
// }

exports.getUserReports= async  (ID, userType) =>{

    userID = '';
    if (userType == "Pathologist") {
        userID = 'pathologistID'
        console.log("fl functionnnnnnnn")
    }
    else {
        userID = 'patientID'
    }
    const reports = await Report.find().where(userID).equals(ID);
    console.log(reports[0]+'mell functionnn')
    return reports;

}

/* Get Pathologist Reports*/

exports.getPateReports = async (req, res) => {
    userID = req.user._id;
    userType = req.user.type;
    console.log(' check #1:'+userID+' check #2:'+userType)
    const reports= await this.getUserReports(userID,userType)
    console.log("check #3: "+reports[0])
    return res.render("patientReportsList", { reports: reports });
}

exports.getPathPatientRep=async(req,res)=>{
    userID = req.body.patient;
    userType ='Patient' ;
    console.log(' check #1:'+userID+' check #2:'+userType)
    const reports= await this.getUserReports(userID,userType)
    console.log("check #3: "+reports[0])
    return res.render("pathPatientsReports", { reports: reports });
    
}

//get all reports
//get a report
// edit a report
//download report 
// path comments / notes 