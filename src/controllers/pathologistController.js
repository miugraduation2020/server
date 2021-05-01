const mongoose = require('mongoose');
const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);
const { PathologistSchema } = require('../models/pathologistModel');
const Pathologist = mongoose.model("Pathologist", PathologistSchema);
const session = require('express-session');

var sess;

exports.getPathologistsPatients = async (req, res) => {

    //Get Pathologist ID from the Application then the DB

    const pathologist = req.body.pathologist;
    const pathologistReq = await Pathologist.findOne({ 'userId': pathologist });

    //Get Patients assigned for the Pathologist + their data

    const patients = pathologistReq.assignedPatients;
    const patientsList = await getAssignedPatient(patients);

    //Get unassigned Patients
    const unassignedPatients = await getUnassigned();


    return res.render("adminAssign", { assigned: patientsList, unassigned: unassignedPatients, pathologistID: pathologist });


}


exports.assignPatients = async (req, res) => {
    const newPatients = []
    const pathologist = req.body.pathologistID;
    const pp = req.body.patientsToAssign;

    await Pathologist.updateOne({ 'userId': pathologist }, { $push: { assignedPatients: pp } })
    console.log("done1")

    if (Array.isArray(pp)) {
        for (let index = 0; index < pp.length; index++) {
            const element = pp[index];
            await assigning(element);
        }
    } else { await assigning(pp) }

    console.log(newPatients);
    console.log(pathologist);
    console.log(pp)

    return res.render('assigningConfirmation', { pathologist: pathologist, newPatients: pathologist })
}


async function assigning(patEmail) {
    await User.updateOne({ email: patEmail }, { $set: { isAssigned: true } })
    console.log('toggeled')
}

async function getAssignedPatient(patients) {
    const patientData = [];
    for (let index = 0; index < patients.length; index++) {
        const element = patients[index];
        p = await User.findOne().where('email').equals(element)
        patientData.push(p);
    }
    console.log('2.5:' + patientData);
    return patientData;
}



exports.getMyPatients = async (req, res) => {

    //Get Pathologist ID from the Application then the DB

    // const pathologist = req.session.userId;
    const pathologist = req.user._id;
    console.log("id" + pathologist)
    const pathologistReq = await Pathologist.findOne({ 'userId': pathologist });
    console.log('path' + pathologistReq)
    //Get Patients assigned for the Pathologist + their data

    const patients = pathologistReq.assignedPatients;
    const myPatientsList = await getAssignedPatient(patients);

    //Get unassigned Patients


    return res.render('pathPatientsList', { myPatients: myPatientsList});


}


async function getUnassigned() {
    const patients = await User.find().where('isAssigned').equals("false");
    console.log('4:' + patients)
    return patients

}