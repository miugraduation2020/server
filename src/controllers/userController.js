const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const sendEmail = require("send-email");
const { UserSchema } = require('../models/userModel');
const dotenv = require("dotenv");
dotenv.config();

const User = mongoose.model('User', UserSchema);

exports.addUser = async (req, res) => {
    const {
        email,
        firstName,
        lastName,
        phoneNumber,
        password,
        confPassword,
        type,
        address,
        dateOfBirth,
        gender
    } = req.body;
    const code = Math.floor(1000 + Math.random() * 9000);
    const errors = { email: [], password: [], confPassword: [] };
    const user = await User.findOne({ email });
    //Check if user exists
    if (user) {
        errors.email.push("User already exists");
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
            return res.status(406).send({ errors });
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

        await user.save();

        sendEmail({
            to: user.email,
            subject: "Please confirm your email address",
            html: `<div>
                <h2>Hi there!</h2>
                <h3>Please verify your email by entering the code below to be able to use our systm.</h3>
                <h3>${code}</h3>
              </div>`,
            from: "BCD.biobsylabs@gmail.com",
        });

        res.send({ user });
    } catch (err) {
        return res.status(406).send({ error: err.message });
    }
}

exports.signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(406).send({ error: "Invalid email or password" });
        }
        if (!user.isVerified) {
            return res
                .status(406)
                .send({ error: "User not verified - Please verify your email" });
        }

        await user.comparePassword(password);
        res.send({ user });
    } catch (err) {
        return res.status(406).send({ error: "Invalid username or password" });
    }
};
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
        from: "BCD.biobsylabs@gmail.com",
    });

    const user = User.find({ email });
    if (!user)
        return res
            .status(406)
            .send({ error: "Email not registered on the system" });

    await User.updateOne({ email }, { $set: { code } });

    res.send({ response: "Success" });
};
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
    await user.save();

    res.send({ response: "Password renewed successfully!" });
};