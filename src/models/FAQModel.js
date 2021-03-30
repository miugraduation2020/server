const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { Int32 } = require("mongodb");


const Schema = mongoose.Schema;

const FAQSchema = new Schema({
    question: {
        type: String,
        required: 'Enter Question'
    },
    answer: {
        type: String,
        required: 'Enter Answer'
    },


    

});



mongoose.model("FAQ", FAQSchema);
