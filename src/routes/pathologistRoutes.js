
const express = require('express');
const router = new express.Router();
const{getPathologistsPatients,assignPatients,getMyPatients}=require("../controllers/pathologistController")

router.post('/adminAssign', getPathologistsPatients)
router.post('/assigningConfirmation',assignPatients)
router.post('/pathPatientsList',getMyPatients)

module.exports = router