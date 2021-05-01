const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const express = require("express");
const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);




//User must be logged in
exports.auth = async (req, res, next) => {
    try {

        // const token = req.header('Authorization').replace('Bearer ', '')
        const token = req.cookies.token.replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).render('mustLogin')
    }
}



//if no session created, user will be redirected to main page
exports.redirectIndex = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/')

    } else { next() }
}


// Admin control only admin can view these pages
// If user is logged in can't re-login 

exports.notAdminRedirectProfile = async (req, res, next) => {
    const userId = req.session.userId;
    try {
        const user = await User.findOne({ _id: userId });
        console.log(user.type);

        if (user.type == 'Patient') {
            res.redirect('/patientProfile')
        } else if (user.type == 'Pathologist') {
            res.redirect('/pathProfile')
        }
        else { next() }
    } catch (error) {

    }
}
exports.patientRedirectProfile = async (req, res, next) => {
    const userId = req.session.userId;
    try {
        const user = await User.findOne({ _id: userId });
        console.log(user.type);

        if (user.type == 'Patient') {
            res.redirect('/patientProfile')
        }
        else { next() }
    } catch (error) {

    }
}

exports.loggedInUser = async (req, res, next) => {

    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });
        console.log(user.type);

        if (user.type == 'Pathologist') {
            res.render('pathProfile', { user: user })
        } else if (user.type == 'Patient') {
            res.render('patientProfile', { user: user })
        } else if (user.type == 'admin') {
            res.render('profile', { user: user })
        }
        else { next() }
    } catch (error) {

    }
}



//logout destroy session
exports.destroySession = async (req, res, next) => {
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();

        res
            .status(200)
            .header('Authorization', req.header('Authorization')), res.redirect('../')

    } catch (error) {
        res.status(500).send(error);
    }
    next()
}