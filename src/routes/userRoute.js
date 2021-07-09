const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, updatePassword, getUsersData, getPatients, getPathologists, searchPatient, deletePatient, deletePathologist, editPathologist, editPatient } = require('../controllers/userController');
const { destroySession, auth, notAdminRedirectProfile, loggedInUser = async (req, res, next) => {

    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });
        console.log(user.type);

        if (user.type == 'Pathologist') {
            const reports = await getUserReports(userId, user.type);
            res.render('pathProfile', { user: user, reports: reports })
        }
        else if (user.type == 'Patient') {
            const reports = await getUserReports(userId, user.type);

            res.render('patientProfile', { user: user, reports: reports })
        }
        else if (user.type == 'Admin') {
            res.render('profile', { user: user })
        }
        else { next() }
    } catch (error) {

    }
}
} = require('../controllers/sessionController')
const { addFAQ, getAllFAQ, deleteFAQ, editFAQ } = require("../controllers/FAQcontroller")
const { getAllReports, genReport, getPathReports, getPateReports, getPathRepProfile, getPathPatientRep, addReview, reportReview,approveReport } = require("../controllers/reportController")

const router = new express.Router()


router.get('/user', (req, res) => {
    res.render('addUsers')
});
router.get('/adminPatientsList', auth, notAdminRedirectProfile, getPatients);
router.get('/adminPathologistsList', auth, notAdminRedirectProfile, getPathologists);
router.get('/adminReportsList', auth, notAdminRedirectProfile, getAllReports);


router.get('/pathReportsList', auth, getPathReports);
router.get('/patientReportsList', auth, getPateReports);
router.post('/pathPatientsReports', auth, getPathPatientRep)
router.post('/addReportReview', auth, reportReview)
router.post('/addReview', auth, addReview)



router.post('/report', auth, genReport);

// splite or remove sidebar menu

router.get('/user/getUser', getUsersData);


router.post('/add-user', addUser)
router.post('/user/sign-in', signIn);
router.post('/user/verify-email', verifyEmail);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/update-password', updatePassword);
router.post('/user/change-password', changePassword);
router.get('/user/logout', auth, destroySession);

router.post('/adminPatientsList', searchPatient);


router.get('/adminFAQ', auth, notAdminRedirectProfile, getAllFAQ)
router.post('/addfaq', auth, notAdminRedirectProfile, addFAQ)
router.post('/adminFAQ', auth, notAdminRedirectProfile, deleteFAQ)
router.post('/editFAQ', editFAQ)
router.post('/adminFAQ', deleteFAQ)


router.post('/profile', auth, deletePatient);
router.post('/adminPathologistsList', auth, notAdminRedirectProfile, deletePathologist)
router.post('/editPat', auth, editPatient)
router.post('/editPath', auth, editPathologist)

router.post('/approvereport',auth, approveReport )

module.exports = router;
