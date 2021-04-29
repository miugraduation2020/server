const express = require('express');
const router = express.Router();
const {UploadImage,getPatAndPath}= require('../controllers/imageController');



router.post('/uploadImage',getPatAndPath)
// var gridfs = require('gridfs-stream');
// gridfs.mongo = mongoose.mongo;
// var connection = mongoose.connection;
// var gfs;
// var fs = require('fs');


// connection.on('error', console.error.bind(console, 'connection error:'));
// connection.once('open', function () {
//     exports.gfs = gridfs(connection.db);

//     router.get('/write',
//         img.writeimg
//     );
//     router.get('/read',
//         img.readimg
//     );
//     router.get('/delete', function (req, res) {
//         img.deleteimg(req, res);
//     });
//     router.get('/meta', function (req, res) {
//         img.metaimg(req, res);
//     });
// }
// )

// // router.post('/pathGenReport',uploadImage)


// module.exports = { gridfs, gfs, fs, router }