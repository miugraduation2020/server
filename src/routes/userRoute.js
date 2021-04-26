const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData, getPatients, getPathologists ,searchPatient} = require('../controllers/userController');
const { destroySession } = require('../controllers/sessionController')
const router = new express.Router()


router.get('/user', (req, res) => {
    res.render('addUser')
});
router.get('/adminPatientsList', getPatients);
router.get('/adminPathologistsList', getPathologists);

router.post('/add-user', addUser)
router.post('/user/sign-in', signIn);
router.post('/user/verify-email', verifyEmail);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/change-password', changePassword);
router.get('/user/getUser', getUsersData);
router.get('/user/logout', destroySession)
router.post('/adminPatientsList', searchPatient);

module.exports = router
