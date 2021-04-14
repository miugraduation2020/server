const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require('express-session');
const { UserSchema } = require('../models/userModel');
const { PathologistSchema } = require('../models/pathologistModel');
const sendEmail = require("send-email");
const User = mongoose.model('User', UserSchema);
const Pathologist = mongoose.model('Pathologist', PathologistSchema);
const path = require('path');
const dotenv = require("dotenv");

dotenv.config();
var sess;



exports.addUser = async (req, res) => {
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const phoneNumber = req.body.phoneNumber;
    const password = req.body.password;
    const confPassword = req.body.confPassword;
    const type = req.body.type;
    const address = req.body.address;
    const dateOfBirth = req.body.dateOfBirth;
    const gender = req.body.gender;

    const code = Math.floor(1000 + Math.random() * 9000);
    const errors = { email: [], password: [], confPassword: [] };
    const emailError = [];
    const user = await User.findOne({ email });

    //Check if user exists
    if (user) {
        errors.email.push("User already exists");
        emailError.push("User already exists");
    }
    try {
        //Password Validation
        if (!password) {
            errors.password.push("Enter password");
        } else {
            if (password.length < 6) {
                errors.password.push("Password must be at least 6 characters");
            }
        }
        //Password matching Validation
        if (!confPassword) {
            errors.confPassword.push("Enter password confirmation");
        } else {
            if (password !== confPassword) {
                errors.confPassword.push("Password does not match");
            }
        }

        //Email Validation
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            errors.email.push("Please provide a valid mail");
        }

        if (
            errors.email.length ||
            errors.password.length ||
            errors.confPassword.length
        ) {

            return res.render('AddUser', {
                errors: errors
            });
        }

        // const token = jwt.sign(email, "abcd1234");

        const user = new User({
            email,
            firstName,
            lastName,
            phoneNumber,
            password,
            type,
            address,
            dateOfBirth,
            gender,
            code,
            // token,
        });
        const pathologist = new Pathologist({
            userId: user._id
        });

        await user.save().then(user => {
            console.log('The user ' + user._id + ' has been added.')
            res.sendFile(__dirname + './view/AddUser.html')


            if (user.type == "pathologist") {
                pathologist.save().then(pathologist => console.log('The Pathologist ' + pathologist + ' has been added.')).then(res.sendFile(__dirname + './view/AddUser.html'))

            }

        },
        )


        // sendEmail({
        //     to: user.email,
        //     subject: "Please confirm your email address",
        //     html: `<div>
        //         <h2>Hi there!</h2>
        //         <h3>Please verify your email by entering the code below to be able to use our system.</h3>
        //         <h3>${code}</h3>
        //       </div>`,
        //     from: "miu.graduation2020@gmail.com",
        // });

        res.redirect('/dashboard')

    } catch (err) {
        console.log(`${res.status(406).send({ error: err.message })}`);
    }

}

/*Sign In*/

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const errors = { email: [], password: [] };
    try {
        const user = await User.findOne({ email });

        if (!user) {
            errors.email.push("Invalid email");
            // console.log(`${res.status(406).send({ error: "Invalid email" })}`);
        } else if (!user.isVerified) {
            errors.email.push("User not verified - Please verify your email");
            // console.log(`${res
            //     .status(406)
            //     .send({ error: "User not verified - Please verify your email" })}`);
        }
        try {
            await user.comparePassword(password);
        } catch (error) {
            errors.password.push("Invalid password");
        }
        if (errors.email.length ||
            errors.password.length
        ) {
            return res.render('PatientsLogin', { errors: errors })
        } else {
            res.send({ user });
        }
    } catch (err) {

        console.log(`${res.status(406).send({ error: err.message })}`);

    }
};

/*Email Varification*/

exports.verifyEmail = async (req, res) => {
    const { email, code } = req.body;

    User.findOne({ email }, function (err, user) {
        if (!user) {
            return res
                .status(406)
                .send({ error: "Unable to find user with this email" });
        }
        if (code !== user.code) {
            return res.status(406).send({ error: "Wrong code entered" });
        }
        user.isVerified = true;
        user.save();
        res.send({ response: "Success!" });
    });
};

/*Forget Password*/

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const code = Math.floor(1000 + Math.random() * 9000);

    sendEmail({
        to: email,
        subject: "Please confirm your email address",
        html: `<div>
      <h2>Hi there!</h2>
      <h3>Please verify your email by entering the code below to be able to reset your password.</h3>
      <h3>${code}</h3>
    </div>`,
        from: "miu.graduation2020@gmail.com",
    });

    const user = User.find({ email });
    if (!user)
        return res
            .status(406)
            .send({ error: "Email not registered on the system" });

    await User.updateOne({ email }, { $set: { code } });

    res.send({ response: "Success" });
};

/*Change Password*/

exports.changePassword = async (req, res) => {
    const { email, password, confPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(406)
            .send({ error: "User does not exists" });
    }
    if (!password) return res.status(406).send({ error: "Enter password" });
    else if (password.length < 6)
        return res
            .status(406)
            .send({ error: "Password must be at least 6 characters" });

    if (!confPassword)
        return res.status(406).send({ error: "Enter password confirmation" });
    else if (password !== confPassword)
        return res.status(406).send({ error: "Password does not match" });

    await User.updateOne({ email }, { $set: { password } });
    // await user.save();

    res.send({ response: "Password renewed successfully!" });
};

exports.getUsersData = async (req, res) => {

    sess = req.session;
    const email = sess.email;

    const u = await User.findOne({ email });
    if (!u) {
        return res
            .status(406)
            .send({ error: "User does not exists" });
    }
    const user = new User({
        email: u.email,
        firstName: u.firstName,
        lastName: u.lastName,
        password: u.password,
        phoneNumber: u.phoneNumber,
        address: u.address,
        dateOfBirth: u.dateOfBirth,
        gender: u.gender,
    })
    res.send(user);
    console.log(user)
}

/*Get All Users*/

exports.getUsers = async (req, res) => {


    const u = await User.find();
    if (!u) {
        return res
            .status(406)
            .send({ error: "Empty Collection" });
    }

    res.send(u);
    console.log(user)
}

/*Get All Pathologists*/

exports.getPathologists = async (req, res) => {


    const u = await User.find().where('type').equals('pathologist');
    if (!u) {
        return res
            .status(406)
            .send({ error: "No Pathologists Yet" });
    }

    res.send(u);
    console.log(user)
}

/*Get All Patients*/

exports.getPatients = async (req, res) => {


    const u = await User.find().where('type').equals('patient');
    if (!u) {
        return res
            .status(406)
            .send({ error: "No Pathologists Yet" });
    }

    res.send(u);
    console.log(user)
}



