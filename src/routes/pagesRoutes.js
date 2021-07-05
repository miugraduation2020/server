const express = require('express');
const router = new express.Router();
const jwt = require("jsonwebtoken");
const session = require('express-session');
const { notAdminRedirectProfile, patientRedirectProfile, loggedInUser, redirectIndex, destroySession, auth, loggedIn } = require('../controllers/sessionController');
const { getMyPatients, getPatAndPath } = require('../controllers/pathologistController');
const { getPathRepProfile } = require('../controllers/reportController')





router.get('/addUser',
    (req, res) => {
        res.render('addUser')
    }
);
router.get('', loggedIn,
    (req, res) => {
        res.render('index')
    }
);

router.get('/ALogin', (req, res) => {
    res.render('ALogin')
});

router.get('/PathLogin', (req, res) => {
    res.render('PathLogin')
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/dashboard', auth, (req, res) => {
    res.render('dashboard')
});

router.get('/profile', auth, loggedInUser);

router.get('/patientsA', auth, (req, res) => {
    res.render('patientsA')
});

router.get('/PathologistsA', auth, (req, res) => {
    res.render('PathologistsA')
});

router.get('/ReportsList', auth, (req, res) => {
    res.render('ReportsList')
});
router.get('/addReportReview', auth, (req, res) => {
    res.render('addReportReview')
});


router.get('/patientInPath', (req, res) => {
    res.render('patientInPath')
});

router.get('/patientProfile', auth, (req, res) => {
    res.render('patientProfile')
});

router.get('/generateReport', auth, (req, res) => {
    res.render('generateReport')
});

router.get('/pathProfile', auth, loggedInUser);

router.get('/report', auth, (req, res) => {
    res.render('report')
});

router.get('/userReportsList', auth, (req, res) => {
    res.render('userReportsList')
});

router.get('/forgotPassword', (req, res) => {
    res.render('forgotPassword')
});

router.get('/verifyEmail', (req, res) => {
    res.render('verifyEmail')
});

router.get('/changePassword', (req, res) => {
    res.render('changePassword')
});

router.get('/adminTumor', auth, (req, res) => {
    res.render('adminTumor')
});

router.get('/adminFAQ', auth, (req, res) => {
    res.render('adminFAQ')
});

router.get('/addTumor', auth, (req, res) => {
    res.render('addTumor')
});

router.get('/addfaq', auth, (req, res) => {
    res.render('addfaq')
});


router.get('/adminPathologistsList', auth, (req, res) => {
    res.render('adminPathologistsList')
});

router.get('/adminReportsList', auth, (req, res) => {
    res.render('adminReportsList')
});

router.get('/patientReportsList', auth, (req, res) => {
    res.render('patientReportsList')
});

router.get('/pathReportsList', auth, (req, res) => {
    res.render('pathReportsList')
});
router.get('/pathPatientsReports', (req, res) => {
    res.render('pathPatientsReports')
});

router.get('/adminAssign', auth, (req, res) => {
    res.render('adminAssign')
});

router.get('/adminAssign/assignNew', (req, res) => {
    res.render('adminAssign')
});

router.get('/assigningConfirmation', (req, res) => {
    res.render('assigningConfirmation')
});

router.get('/pathGenReport', auth, loggedInUser
);

router.get('/pathPatientsList', auth, getMyPatients);


router.get('/pathPatientProfile', auth, patientRedirectProfile, (req, res) => {
    res.render('pathPatientProfile')
});

router.get('/settings', (req, res) => {
    res.render('settings')
});

router.get('/mustLogin', (req, res) => {
    res.render('mustLogin')
});

router.get('/diagnosing', (req, res) => {
    res.render('diagnosing')
});

router.get('/404', (req, res) => {
    res.render('404')
});





module.exports = router
