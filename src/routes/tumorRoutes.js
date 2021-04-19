const express = require('express');
const { addTumor,getAllTumor} = require('../controllers/tumorController');
const router = new express.Router()



router.post('/addTumor', addTumor)
router.post('/adminTumor',getAllTumor)
module.exports = router