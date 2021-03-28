const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: 'Enter First Name'
    },
    lastName: {
        type: String,
        required: 'Enter Last Name'
    },
    email: {
        type: String,
        required: 'Enter Email'
    },
    password: {
        type: String,
        required: 'Enter password'
    },
    address: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: String,
        default: null
    },
    gender: {
        type: String,
        required: 'Enter gender'
    },
    type: {
        type: String,
        required: 'Enter user type'
    },
    phoneNumber: {
        type: String,
        required: 'Enter phoneNumber'
    },

});

mongoose.model("User", UserSchema);

UserSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function (enteredPassword) {
    const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(enteredPassword, user.password, (err, matched) => {
            if (err) {
                return reject(err);
            }
            if (!matched) {
                return reject(false);
            }
            resolve(true);
        });
    });
};