const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const express = require("express");
const session = require('express-session');
const { UserSchema } = require('../models/userModel');
const { PathologistSchema } = require('../models/pathologistModel');
const sendEmail = require("send-email");
const User = mongoose.model('User', UserSchema);
const Pathologist = mongoose.model('Pathologist', PathologistSchema);
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');

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
                errors: errors,
                inputEmail: email,
                inputFName: firstName,
                inputLName: lastName,
                inputPhoneNumber: phoneNumber,
                inputPassword: password,
                inputConfPassword: confPassword,
                inputType: type,
                inputAddress: address,
                inputDOB: dateOfBirth,
                inputGender: gender,

            });
        }

        const token = jwt.sign(email, "abcd1234");

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
            token,
        });
        const pathologist = new Pathologist({
            userId: user._id
        });

        await user.save().then(user => {
            console.log('The user ' + user._id + ' has been added.')


            if (user.type == "Pathologist") {
                pathologist.save().then(pathologist => console.log('The Pathologist ' + pathologist + ' has been added.'))

            }

        },
        )


        sendEmail({
            to: user.email,
            subject: "Please confirm your email address",
            html: `<div>
                <h2>Hi there!</h2>
                <h3>Please verify your email by entering the code below to be able to use our system.</h3>
                <h3>${code}</h3>
              </div>`,
            from: "miu.graduation2020@gmail.com",
        });

        res.render('dashboard')

    } catch (err) {
        console.log(`${res.status(406).send({ error: err.message })}`);
    }

}

/*Sign In*/

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    const errors = { email: [], password: [] };
    // const input = { email: [], password: [] }
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
            return res.render('PatientsLogin', { errors: errors, inputEmail: email, inputPassword: password, message: "Forgot Password?" })
        } else {
            res.send({ user });
            console.log(user.lastName)
        }
    } catch (err) {

        console.log(`${res.status(406).send({ error: err.message })}`);

    }
};

/*Email Varification*/

exports.verifyEmail = async (req, res) => {
    const { email, code, screen } = req.body;

    User.findOne({ email }, function (err, user) {
        if (!user) {
            return res
                .status(406).render('verifyEmail', { error: "Unable to find user with this email", inputEmail: email });
        }
        if (code !== user.code) {
            return res.status(406).render('verifyEmail', { error2: "Wrong code entered", inputEmail: email });
        }
        user.isVerified = true;
        user.save();
        if (screen == "forgotPassword") {
            res.render('changePassword', { email: email })
        } else {
            res.send({ response: "Success!" });
        }
    });
};

/*Forget Password*/

exports.forgotPassword = async (req, res) => {
    const { email, screen } = req.body;
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
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(406)
                .render('forgotPassword', { error: "Email not registered on the system" });
        } else {

            await User.updateOne({ email }, { $set: { code } });
            res.render('verifyEmail', { screen: screen });
        }
    } catch (err) {

        console.log(`${res.status(406).send({ error: err.message })}`);

    }
};

/*Change Password*/

exports.changePassword = async (req, res) => {
    const { email, password, confPassword } = req.body;
    const errors = { password: [], confPassword: [] };
    const saltRounds = 10;
    //let foundUser = await userModel.findOneAndUpdate(
    //  { email: recievedEmail, password: hashedPassword },
    //  { $set: { lastLogin: new Date() }, $push: { myEvents: authEvent } }
    // );

    const user = await User.findOne({ email });
    if (!user) {
        return res
            .status(406)
            .send({ error: "User does not exists" });
    }
    if (!password) return res.status(406).send({ error: "Enter password" });
    else if (password.length < 6) { errors.password.push("Password must be at least 6 characters"); }


    if (!confPassword) {
        errors.confPassword.push("Enter password confirmation");

    }
    if (password !== confPassword) {
        errors.confPassword.push("Password does not match");
    }
    if (
        errors.password.length ||
        errors.confPassword.length
    ) {
        return res
            .status(406).render('changePassword', {
                email: email,
                inputPassword: password,
                inputConfPassword: confPassword,
                errors: errors

            })
    }
    try {

        await User.updateOne({ email }, { $set: { password } });

        // res.redirect('../')
        // res.send(user);
    } catch (error) {
        console.log(`${res.status(406).send({ error: error.message })}`);
    }


    res.send({ response: "Password renewed successfully!" });
};
/*Get Current User*/
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
        id: u._id,
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


    const allPath = await User.find().where('type').equals('Pathologist');
    console.log(allPath[0]);

   return res.render("adminPathologistsList", {pathologists:allPath});
}

/*Get All Patients*/

exports.getPatients = async (req, res) => {

    const allPate = await User.find().where('type').equals('Patient');
    console.log(allPate[0]);

   return res.render("adminPatientsList", {pateints:allPate});

}





