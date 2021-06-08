const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData, getPatients, getPathologists, searchPatient, deletePatient, deletePathologist, editPathologist,editPatient} = require('../controllers/userController');
const { destroySession, auth,notAdminRedirectProfile } = require('../controllers/sessionController')
const { addFAQ, getAllFAQ, deleteFAQ, editFAQ } = require("../controllers/FAQcontroller")
const{getAllReports,genReport,getPathReports,getPateReports,getPathRepProfile,getPathPatientRep}=require("../controllers/reportController")

const router = new express.Router()


router.get('/user', (req, res) => {
    res.render('addUser')
});
router.get('/adminPatientsList',auth, notAdminRedirectProfile, getPatients);
router.get('/adminPathologistsList',auth,notAdminRedirectProfile, getPathologists);
router.get('/adminReportsList',auth,notAdminRedirectProfile, getAllReports);


router.get('/pathReportsList',auth, getPathReports);
router.get('/patientReportsList',auth, getPateReports);
router.post('/pathPatientsReports',auth, getPathPatientRep)



router.post('/report', genReport);

// splite or remove sidebar menu

router.get('/user/getUser', getUsersData);


router.post('/add-user', addUser)
router.post('/user/sign-in', signIn);
router.post('/user/verify-email', verifyEmail);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/change-password', changePassword);
router.get('/user/logout', auth, destroySession);

router.post('/adminPatientsList', searchPatient);


router.get('/adminFAQ',auth,notAdminRedirectProfile, getAllFAQ)
router.post('/addfaq',auth,notAdminRedirectProfile, addFAQ)
router.post('/adminFAQ',auth,notAdminRedirectProfile, deleteFAQ)
router.post('/editFAQ',auth,notAdminRedirectProfile, editFAQ)


router.post('/profile', deletePatient);
router.post('/adminPathologistsList', auth,notAdminRedirectProfile, deletePathologist)
router.post('/editPat',editPatient)
router.post('/editPath',editPathologist)

module.exports = router;
