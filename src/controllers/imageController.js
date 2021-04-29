//const path = requir('path');
const mongoose = require('mongoose');
const e = require('express');
var gridfs = require('gridfs-stream');
const {ImageSchema} = require('../models/imagesModel');
const Image = mongoose.model("Image", ImageSchema);
const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);
var fs = require('fs');

const dburl = require("../db");

var db_filename;
var local_file;

gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function imageUpload (local_file,db_filename) {

    gfs = gridfs(connection.db);

    exports.writeimg = function (req, res) {
        var writestream = gfs.createWriteStream({ filename: db_filename });
        fs.createReadStream(local_file).pipe(writestream);
        writestream.on('close', function (file) {
            res.send('File Created : ' + file.filename);
            console.log("writing")
        });
    };


    exports.readimg = function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                var readstream = gfs.createReadStream({ filename: db_filename });
                readstream.pipe(res);
            }
        });
    }

    exports.deleteimg = function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.remove({ filename: db_filename }, function (err) {
                    if (err) res.send(err);
                    res.send('File Deleted');
                });
            }
        });
    }
    exports.metaimg = function (req, res) {
        gfs.exist({ filename: db_filename }, function (err, file) {
            if (err || !file) {
                res.send('File Not Found');
            } else {
                gfs.files.find({ filename: db_filename }).toArray(function (err, files) {
                    if (err) res.send(err);
                    res.send(files);
                });
            }
        });
    }
}
)

exports.AddImage = async (req,res)=>{
    const pathologistId = req.body.pathologist;
    const patientId=req.body.patient;
    const patient= await User.findOne({id:patient});
    const image=req.body.fileUpload;
    const date=Date.now;
    local_file=image.value;
    db_filename=`${patient.firstName}${patien.lastName}id_${patientId}`

    const image = new Image({
        local_file,
        db_filename,
        date,
        patientId,
        pathologistId

    })
    await image.save().then(image=>{imageUpload(local_file,db_filename); console.log(image)})

}

exports.getPatAndPath = async(req,res)=>{
    const pathologistId=req.session.userId;
    const patientId=req.body.patient;
    console.log('path: '+pathologistId+", pat: " + patientId);
    return res.render("pathGenReport",{pathologistId:pathologistId,pathologistId:patientId});

}