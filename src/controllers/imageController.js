//const path = requir('path');
const e = require('express');
const mongoose = require('mongoose');
var gridfs = require('gridfs-stream');
const image = require('../models/imagesModel');
var fs = require('fs');

const dburl = require("../db");

var db_filename = "testy.tif";
var local_file = "D:/MIU/Graduation Project/newServer/server/is003.tif";

gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', function () {
    
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
