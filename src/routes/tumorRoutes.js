const express = require('express');
const { addTumor, getAllTumor, deleteTumor, editTumor } = require('../controllers/tumorController');
const { auth } = require('../controllers/sessionController');
const router = new express.Router()



router.post('/addTumor', auth, addTumor)
router.post('/adminTumor', auth, deleteTumor)
router.get('/adminTumor', auth, getAllTumor)
router.post('/editTumor', auth, editTumor)
module.exports = router
