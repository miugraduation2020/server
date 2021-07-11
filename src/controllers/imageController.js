const express = require("express");
const session = require("express-session")
const Jimp = require("jimp")
var fs = require('fs');

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


exports.addImage = async (filename, Ipatientid, Ipathologistid, fileId, gfs) => {


  const imgPath = "src\\models\\DiagnosisImages\\" + filename
  const pathologistID = Ipathologistid;
  const patientID = Ipatientid;
  console.log('pathologist' + pathologistID)
  console.log('patientId' + patientID)
  console.log(imgPath + '  rhw')
  var imgrname = filename.substr(0, filename.indexOf('.'));

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
    image.save().then(image => {
      addNewReport(patientID,
        pathologistID,
        tumorID,
        image._id,
        false,
        imgrname)
    },
      Jimp.read("src\\models\\DiagnosisImages\\" + filename, function (err, file) {
        if (err) {
          console.log(err)
        } else {

          file.write("src\\view\\plugins\\reportsImages\\" + imgrname + ".jpg")
        }
      })
      , fs.unlinkSync(imgPath),
      console.log(image._id + 'iJBSR' + uploadDate + 'SNB' + patientID));




  });


}







// function make tumorID of add this function in the model controllet and call it in addImage function
