const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData, getPatients, getPathologists, searchPatient, deletePatient, deletePathologist } = require('../controllers/userController');
const { destroySession, auth } = require('../controllers/sessionController')
const { addFAQ, getAllFAQ, deleteFAQ } = require("../controllers/FAQcontroller")
const{getAllReports,genReport}=require("../controllers/reportController")

const router = new express.Router()


router.get('/user', (req, res) => {
    res.render('addUser')
});
router.get('/adminPatientsList', getPatients);
router.get('/adminPathologistsList', getPathologists);
router.get('/adminReportsList', getAllReports);

router.post('/report', genReport);


router.get('/user/getUser', getUsersData);


router.post('/add-user', addUser)
router.post('/user/sign-in', signIn);
router.post('/user/verify-email', verifyEmail);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/change-password', changePassword);
router.get('/user/logout', auth, destroySession);

router.post('/adminPatientsList', searchPatient);


router.get('/adminFAQ', getAllFAQ)
router.post('/addfaq', addFAQ)
router.post('/adminFAQ', deleteFAQ)

router.post('/profile', deletePatient);
router.post('/adminPathologistsList', deletePathologist)

module.exports = router
