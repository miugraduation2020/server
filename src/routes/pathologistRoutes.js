
const express = require('express');
const router = new express.Router();
const{getPathologistsPatients,assignPatients}=require("../controllers/pathologistController")
router.post('/adminAssign', getPathologistsPatients)
router.post('/adminAssign/assignNew',assignPatients)

module.exports = router