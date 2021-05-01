const express = require('express');
const router = new express.Router();
const{getPathologistsPatients,assignPatients,getMyPatients, getPatAndPath}=require("../controllers/pathologistController")
const {auth,loggedInUser}=require('../controllers/sessionController')

router.post('/adminAssign', getPathologistsPatients)
router.post('/assigningConfirmation',assignPatients)
router.get('/pathPatientsList',auth, getMyPatients)
router.post('/pathGenReport',auth, getPatAndPath);


module.exports = router