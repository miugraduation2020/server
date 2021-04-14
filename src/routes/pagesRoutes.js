const express = require('express');
const router = new express.Router()


router.get('/addUser', (req, res) => {
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

router.get('/pathProfile', (req, res) => {
    res.render('pathProfile')
});

router.get('/report', (req, res) => {
    res.render('report')
});

router.get('/userReportsList', (req, res) => {
    res.render('userReportsList')
});

router.get('/404', (req, res) => {
    res.render('404')
});


module.exports = router