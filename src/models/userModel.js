const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Int32 } = require("mongodb");


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
    isVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    code: {
        type: String,
    },
    codeExpires: {
        type: Date,
        default: () => new Date(+new Date() + 10080 * 60 * 1000),
    },
    isAssigned: {
        type: Boolean,
        default: false
    },
    tokens: [{
        token: { type: String, required: true }
    }]

});
UserSchema.methods.generateAuthToken = async function (req, res, next) {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
    // return res.send(token)
}

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

UserSchema.pre("updateOne", async function (next) {
    const password = this.getUpdate().$set.password;
    if (!password) {
        return next();
    }
    try {
        const salt = 10
        const hash = bcrypt.hashSync(password, salt);
        this.getUpdate().$set.password = hash;
        next();
    } catch (error) {
        return next(error);
    }

    this._update.password = await bcrypt.hash(this._update.password, 10)

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

UserSchema.index(
    { codeExpires: 1 },
    { expireAfterSeconds: 0, partialFilterExpression: { isVerified: false } }
);
mongoose.model("User", UserSchema);
