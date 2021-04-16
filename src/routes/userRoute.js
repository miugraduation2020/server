const express = require('express');
const { addUser, signIn, verifyEmail, forgotPassword, changePassword, getUsersData } = require('../controllers/userController');
const router = new express.Router()


router.get('/user', (req, res) => {
    res.render('addUser')
});

router.post('/add-user', addUser)
router.post('/user/sign-in', signIn);
router.post('/user/verify-email', verifyEmail);
router.post('/user/forgot-password', forgotPassword);
router.post('/user/change-password', changePassword);
router.get('/user/getUser', getUsersData);


module.exports = router