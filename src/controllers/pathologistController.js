const mongoose = require('mongoose');
const { UserSchema } = require('../models/userModel');
const { PathologistSchema } = require('../models/pathologistModel');
const User = mongoose.model('User', UserSchema);
const Pathologist = mongoose.model("Pathologist", PathologistSchema);


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
    await Pathologist.updateOne({ 'userId': pathologist }, { $push: { assignedPatients: newPatients } })
    console.log("done1")
    const pp = req.body.patientsToAssign;
    if (pp.length > 0) {
        newPatients.push(pp)
        for (let index = 0; index < newPatients.length; index++) {
            const element = newPatients[index];
            await assigning(element);
        }
    } else {
        for (let index = 0; index < newPatients.length; index++) {
            const element = newPatients[index];
            await assigning(element);
        }
    }
    console.log(newPatients);
    console.log(pathologist)





    this.getPathologistsPatients;
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

async function getUnassigned() {
    const patients = await User.find().where('isAssigned').equals("false");
    console.log('4:' + patients)
    return patients

}

