
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
const {addNewReport}=require('./reportController')
exports.addImage = async (req, res) => {

    const imgPath=req.body.imgPath;
    const pathologistID = req.body.pathologist;
    const patientId = req.body.patient;
    console.log('pathologist'+pathologistID)
    console.log('patientId'+patientId)
    console.log(imgPath+'  rhw')


    const patient = await User.findById(patientId);
    var uploadDate = Date.now();
    const imgName = `${uploadDate}-${patient.firstName} ${patient.firstName}-ID:${patient.id}`
    diagnosis=''
    model(imgPath, function (diagnosis) {
        console.log("The Diagnosis is "+diagnosis);
        console.log(diagnosis+"image")
        const image = new Image({ imgPath, imgName, uploadDate, patient, pathologistID,diagnosis })
        image.save().then(image => {   addNewReport(image._id,diagnosis)  });
        res.redirect('profile');
    
        });

}






// function make Diagnosis of add this function in the model controllet and call it in addImage function  

