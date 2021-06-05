const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const {  addImage } = require('../controllers/imageController');
const {auth}= require('../controllers/sessionController')




//router.post('/uploadImage', auth, addImage)



module.exports = router
