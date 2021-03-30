import mongoose from 'mongoose';
import { ReportSchema } from '../models/reportModel'

const Report = mongoose.model('Report', ReportSchema);

export const genNewReport = (req, res) => {
    let newReport = new Report(req.body);
    newReport.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    })
}

export const getReports = (req, res) => {

    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    })
}