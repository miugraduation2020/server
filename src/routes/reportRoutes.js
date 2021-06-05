const express = require('express');
const{getAllReports}=require("../controllers/reportController")
const {auth,loggedInUser}=require('../controllers/sessionController')

const router = new express.Router();

// router.get('/adminReportsList', getAllReports);
// router.get('/pathProfile',auth, getMyPatients)


module.exports = router