const express = require('express');
const { addTumor,getAllTumor, deleteTumor} = require('../controllers/tumorController');
const router = new express.Router()



router.post('/addTumor', addTumor)
router.post('/adminTumor', deleteTumor)
router.get('/adminTumor',getAllTumor)
module.exports = router
