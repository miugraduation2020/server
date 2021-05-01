
const express = require('express');
const router = new express.Router();
const{getPathologistsPatients,assignPatients,getMyPatients}=require("../controllers/pathologistController")
const {auth}=require('../controllers/sessionController')
router.post('/adminAssign', getPathologistsPatients)
router.post('/assigningConfirmation',assignPatients)
router.post('/pathPatientsList',auth, getMyPatients)

module.exports = router