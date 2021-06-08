const express = require('express');
const { addTumor,getAllTumor, deleteTumor, editTumor} = require('../controllers/tumorController');
const router = new express.Router()



router.post('/addTumor', addTumor)
router.post('/adminTumor', deleteTumor)
router.get('/adminTumor',getAllTumor)
router.post('/editTumor',editTumor)
module.exports = router
