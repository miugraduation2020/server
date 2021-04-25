const express = require('express');
const router = new express.Router()
const session = require('express-session');
const { redirectIndex, redirectProfile } = require('../controllers/sessionController')


router.get('/addUser', redirectIndex, (req, res) => {
    res.render('addUser')
});

router.get('/ALogin', redirectIndex, (req, res) => {
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

router.get('/profile', redirectIndex, (req, res) => {
    res.render('profile')
});

router.get('/patientsA', redirectIndex, (req, res) => {
    res.render('patientsA')
});

router.get('/PathologistsA', redirectIndex, (req, res) => {
    res.render('PathologistsA')
});

router.get('/ReportsList', redirectIndex, (req, res) => {
    res.render('ReportsList')
});

router.get('/patientInPath', redirectIndex, (req, res) => {
    res.render('patientInPath')
});

router.get('/patientProfile', redirectIndex, (req, res) => {
    res.render('patientProfile')
});

router.get('/generateReport', redirectIndex, (req, res) => {
    res.render('generateReport')
});

router.get('/pathProfile', redirectIndex, (req, res) => {
    res.render('pathProfile')
});

router.get('/report', redirectIndex, (req, res) => {
    res.render('report')
});

router.get('/userReportsList', redirectIndex, (req, res) => {
    res.render('userReportsList')
});

router.get('/forgotPassword', redirectIndex, (req, res) => {
    res.render('forgotPassword')
});

router.get('/verifyEmail', (req, res) => {
    res.render('verifyEmail')
});

router.get('/changePassword', redirectIndex, (req, res) => {
    res.render('changePassword')
});
router.get('/adminTumor', redirectIndex, (req, res) => {
    res.render('adminTumor')
});
router.get('/addTumor', redirectIndex, (req, res) => {
    res.render('addTumor')
});
router.get('/adminPatientsList', redirectIndex, (req, res) => {
    res.render('adminPatientsList')
});
router.get('/adminPathologistsList', redirectIndex, (req, res) => {
    res.render('adminPathologistsList')
});
router.get('/adminAssign', redirectIndex, (req, res) => {
    res.render('adminAssign')
});
router.get('/adminAssign/assignNew', redirectIndex, (req, res) => {
    res.render('adminAssign')
});
router.get('/404', (req, res) => {
    res.render('404')
});
router.get('/assigningConfirmation', (req, res) => {
    res.render('assigningConfirmation')
});



module.exports = router