
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

    //  const imgPath=req.body.fileUpload;
    const pathologistID = req.session.myid;
    const patientMail = req.body.patient;
    console.log(pathologistID)

    const imgPath = 'D:\\MIU\\Graduation Project\\ICIAR2018_BACH_Challenge\\Photos\\InSitu\\is002.tif';
    // const pathologistID = '606fbab4337804134c3f0c2a';
    // const patientMail ='u@mail.com';
    const patient = await User.findOne({ email: 'u@mail.com' });
    var uploadDate = Date.now();
    const imgName = `${uploadDate}-${patient.firstName} ${patient.firstName}-ID:${patient.id}`

    const image = new Image({ imgPath, imgName, uploadDate, patient, pathologistID })
    await image.save().then(image => { console.log('The img with id ' + image._id + ' has been added.') });
    const diagnosis = await new model(imgPath);
    
}




// function make Diagnosis of add this function in the model controllet and call it in addImage function  

