const express = require('express');
const router = new express.Router();
const{addFAQ, deleteFAQ}=require("../controllers/FAQcontroller")


//router.get('/adminFAQ', getAllFAQ)
// router.post('/addfaq', addFAQ)
router.post('/adminFAQ',deleteFAQ)

module.exports = router
