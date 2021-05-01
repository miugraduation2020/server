const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {  addImage, getPatAndPath } = require('../controllers/imageController');

var gridfs = require('gridfs-stream');
gridfs.mongo = mongoose.mongo;
var connection = mongoose.connection;
var gfs;
var fs = require('fs');


router.post('/Diagnose', getPatAndPath);

router.post('/uploadImage', addImage)



module.exports = router