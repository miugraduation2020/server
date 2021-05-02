
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

exports.addImage = async (req, res) => {

    const imgPath=req.body.fileUpload;
    const pathologistID = req.body.pathologist;
    const patientId = req.body.patient;
    console.log('pathologist'+pathologistID)
    console.log('patientId'+patientId)
    console.log(imgPath+'  rhw')


    const patient = await User.findById(patientId);
    var uploadDate = Date.now();
    const imgName = `${uploadDate}-${patient.firstName} ${patient.firstName}-ID:${patient.id}`
    const image = new Image({ imgPath, imgName, uploadDate, patient, pathologistID })
    await image.save().then(image => { console.log('The img with id ' + image._id + ' has been added.') });
    const diagnosis = await new model(imgPath);
    res.redirect('pathProfile');
}




// function make Diagnosis of add this function in the model controllet and call it in addImage function  

