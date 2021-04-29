const express = require('express');
const router = new express.Router()
const session = require('express-session');
const { redirectProfile, loggedInUser } = require('../controllers/sessionController')


router.get('/addUser', redirectProfile, (req, res) => {
    res.render('addUser')
});

router.get('/ALogin', (req, res) => {
    res.render('ALogin')
});

router.get('/PathLogin', (req, res) => {
    res.render('PathLogin')
});

router.get('/patientsLogin', (req, res) => {
    res.render('patientsLogin')
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

router.get('/profile', (req, res) => {
    res.render('profile')
});

router.get('/patientsA', (req, res) => {
    res.render('patientsA')
});

router.get('/PathologistsA', (req, res) => {
    res.render('PathologistsA')
});

router.get('/ReportsList', (req, res) => {
    res.render('ReportsList')
});

router.get('/patientInPath', (req, res) => {
    res.render('patientInPath')
});

router.get('/patientProfile', (req, res) => {
    res.render('patientProfile')
});

router.get('/generateReport', (req, res) => {
    res.render('generateReport')
});

router.get('/pathProfile', loggedInUser);

router.get('/report', (req, res) => {
    res.render('report')
});

router.get('/userReportsList', (req, res) => {
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
router.get('/adminTumor', (req, res) => {
    res.render('adminTumor')
});
router.get('/adminFAQ', (req, res) => {
    res.render('adminFAQ')
});
router.get('/addTumor', (req, res) => {
    res.render('addTumor')
});
router.get('/addfaq', (req, res) => {
    res.render('addfaq')
});
router.get('/adminPatientsList', (req, res) => {
    res.render('adminPatientsList')
});
router.get('/adminPathologistsList', (req, res) => {
    res.render('adminPathologistsList')
});
router.get('/adminAssign', (req, res) => {
    res.render('adminAssign')
});
router.get('/adminAssign/assignNew', (req, res) => {
    res.render('adminAssign')
});
router.get('/404', (req, res) => {
    res.render('404')
});
router.get('/assigningConfirmation', (req, res) => {
    res.render('assigningConfirmation')
});

router.get('/pathGenReport', (req, res) => {
    res.render('pathGenReport')
});

router.get('/pathPatientsList', (req, res) => {
    res.render('pathPatientsList')
});


router.get('/pathPatientProfile', (req, res) => {
    res.render('pathPatientProfile')
});





module.exports = router
