const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const express = require("express");
const { UserSchema } = require('../models/userModel');
const { getUserReports } = require("../controllers/reportController")
const User = mongoose.model('User', UserSchema);

exports.getUserEmail = async (req, res, next) => {

    try {
        const userId = req.user._id;
        const user = await User.findOne({ _id: userId });
        console.log("The user  " + user.type);

        if (user.type == 'Pathologist') {
            res.render('settings', { user: user })
        }
        else if (user.type == 'Patient') {

            res.render('settings', { user: user })
        }
        else if (user.type == 'Admin') {
            res.render('settings', { user: user })
        }
        else { next() }
    } catch (error) {

    }
}
