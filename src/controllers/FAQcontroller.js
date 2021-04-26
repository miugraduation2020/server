const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { FAQSchema } = require('../models/FAQModel');
const dotenv = require("dotenv");
dotenv.config();

const FAQ = mongoose.model('FAQ', FAQSchema);

//addfaq
exports.addFAQ = async (req, res) => {
    const {
        question,
        answer,

    } = req.body;

    try {
        const faq = new FAQ({
            question,
            answer,
        });
        await faq.save().then(faq => {
            console.log('The faq ' + faq.question + ' has been added.');

        },
        );
        res.send({ faq });
    } catch (err) {
        return res.status(406).send({ error: err.message });
    }
}

//get faq
exports.getAllFAQ = async (req, res) => {

    const allFAQ = await FAQ.find({});
    console.log(allFAQ);

    return res.render("adminFAQ", {faqs:allFAQ});
   
}

// //delete faq
exports.deleteFAQ = async (req, res) => {

    const del = await FAQ.deleteOne({});
        console.log(del);

    return res.render("adminFAQ", {faqs:del});

}
//edit faq








