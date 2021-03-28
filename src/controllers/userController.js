const mongoose = require('mongoose');
const { UserSchema } = require('../models/userModel')

const User = mongoose.model('User', UserSchema);

exports.addUser = async (req, res) => {

    // let newUser = new User(req.body);
    // newUser.save((err, user) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     res.json(user);
    // })

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
    const errors = { email: [], password: [], confPassword: [] };
    const user = await User.findOne({ email });

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

        //   const token = jwt.sign(email, "abcd1234");

        const user = new User({
            email,
            firstName,
            lastName,
            phoneNumber,
            password,
            type,
            address,
            dateOfBirth,
            gender

        });

        await user.save();



        res.send({ user });
    } catch (err) {
        return res.status(406).send({ error: err.message });
    }
}




