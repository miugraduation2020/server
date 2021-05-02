const mongoose = require('mongoose');
const session = require('express-session');
const users = require('./userController');
const { ReportSchema } = require('../models/reportModel');
const Report = mongoose.model('Report', ReportSchema);
const { ImageSchema } = require('../models/imagesModel')
const Image = mongoose.model('Image', ImageSchema)
const { TumorSchema } = require('../models/tumorModel')
const Tumor = mongoose.model('Tumor', TumorSchema)


exports.genReport = async (req, res) => {

    const genDate = new Date();
    const pathID =pathologist.id;
    const patID = req.body.patID;
    const imageID = req.body.imageID;
    const tumorID = req.body.tumorID;


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
async function addNewReport(imgId,tumorID){
    imageData= await Image.findById(imgId);
    tumorData= await Tumor.findById(tumorID);

}