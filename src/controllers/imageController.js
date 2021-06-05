
const express = require("express");
const session = require("express-session")
const mongoose = require('mongoose');
const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);
const { ImageSchema } = require('../models/imagesModel')
const Image = mongoose.model('Image', ImageSchema)
const { createReadStream } = require('fs');
const { createModel } = require('mongoose-gridfs');
var connection = mongoose.connection;
const model = require('./modelController')
const { addNewReport } = require('./reportController')

exports.addImage = async (req, res) => {

    const imgPath = req.body.imgPath;
    const pathologistID = req.body.pathologist;
    const patientID = req.body.patient;
    console.log('pathologist' + pathologistID)
    console.log('patientId' + patientID)
    console.log(imgPath + '  rhw')


    const patient = await User.findById(patientID);
    var uploadDate = Date.now();
    const imgName = `${uploadDate}-${patient.firstName} ${patient.firstName}-ID:${patient.id}`
    tumorID = ''
    model(imgPath, function (tumorID) {
        console.log("The tumorID is " + tumorID);
        const image =
            new Image(
                {
                    imgPath,
                    imgName,
                    uploadDate,
                    patientID,
                    pathologistID,
                    tumorID
                }
            )
        image.save().then(image => { addNewReport(patientID,
            pathologistID,
            tumorID,
            image._id) }, console.log(image._id +'iJBSR'+ uploadDate+'SNB'+patientID));

    });
    return res.redirect('profile');

}






// function make tumorID of add this function in the model controllet and call it in addImage function  

