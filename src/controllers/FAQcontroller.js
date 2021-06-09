const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const { FAQSchema } = require('../models/FAQModel');
const dotenv = require("dotenv");
const { ObjectID } = require('bson');
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
        res.redirect('/adminFAQ');
    } catch (err) {
        return res.status(406).send({ error: err.message });
    }
}

//get faq
exports.getAllFAQ = async (req, res) => {

    const allFAQ = await FAQ.find({});
    console.log(allFAQ);

    return res.render("adminFAQ", { faqs: allFAQ, user: req.user });

}

//deleteFAQ
exports.deleteFAQ = async (req, res) => {

    const del = await FAQ.deleteOne({ _id: req.body.deleteid });
    console.log(del);

    const allFAQ = await FAQ.find({});

    return res.render("adminFAQ", { faqs: allFAQ });

}

//edit faq

exports.editFAQ = async (req, res) => {
    const { editID, quesnew, ansnew } = req.body;

    const faq = await FAQ.findByIdAndUpdate({ _id: new ObjectID(editID) }, {
        question: quesnew,
        answer: ansnew
    });

    if (!faq) {
        return res
            .status(406)
            .send({ error: "FAQ does not exists" });
    }


    res.redirect('adminFAQ');
};
