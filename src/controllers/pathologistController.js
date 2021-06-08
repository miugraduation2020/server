
const mongoose = require('mongoose');

const { UserSchema } = require('../models/userModel');
const User = mongoose.model('User', UserSchema);

const { PathologistSchema } = require('../models/pathologistModel');
const Pathologist = mongoose.model("Pathologist", PathologistSchema);


/* Get all the Patients Assigned to a Certain Pathologist */

exports.getPathologistsPatients = async (req, res) => {

    //Get Pathologist ID from the Application then the DB
    const pathologist = req.body.pathologist;
    const pathologistReq = await Pathologist.findOne({ 'userId': pathologist });
    const pathologistData = await User.findById(pathologist);

    
    //Pathologist Data
    const pathologistName= `Dr. ${pathologistData.firstName} ${pathologistData.lastName}`


    //Get Patients assigned for the Pathologist + their data
    const patients = pathologistReq.assignedPatients;
    const patientsList = await getAssignedPatient(patients);


    //Get unassigned Patients
    const unassignedPatients = await getUnassigned();


    return res.render("adminAssign", {

        assigned: patientsList, 
        unassigned: unassignedPatients, 
        pathologistID: pathologist, 
        pathologistName: pathologistName

    });


}

/* Assigning Patients to a Pathologist */

exports.assignPatients = async (req, res) => {

    const newPatients = []
    const pathologist = req.body.pathologistID;
    const pp = req.body.patientsToAssign;

    // Updating the Pathologist's recored in the 'pathologist' collection by adding the new patients to the assignedPatients list
    await Pathologist.updateOne({ 'userId': pathologist }, { $push: { assignedPatients: pp } })
        // console.log("done1")

    
    // Updating Patients Records From Unassigned to assigned
    // Making sure if we are receiveing the multiple unassigned patients (Array) or only one (String)
    if (Array.isArray(pp)) {
        for (let index = 0; index < pp.length; index++) {
            const element = pp[index];
            await assigning(element);
        }
    } else { 
        await assigning(pp) 
    }

        // console.log("CheckPath#1: "+newPatients);
        // console.log("CheckPath#2: "+pathologist);
        // console.log("CheckPath#3: "+pp)

    return res.render('assigningConfirmation', {

        pathologist: pathologist, 
        newPatients: pathologist
    })
}


/* Updating Patients Records From Unassigned to Assigned */

async function assigning(patEmail) {

    await User.updateOne({ email: patEmail }, { $set: { isAssigned: true } })
    // console.log('toggeled')

}


/* Getting Pathologist's Patients' Data */

async function getAssignedPatient(patients) {

    const patientData = [];
    
    for (let index = 0; index < patients.length; index++) {

        const element = patients[index];
        p = await User.findOne().where('email').equals(element)
        patientData.push(p);
    }

        //console.log("CheckPath#4: "+ patientData);

    return patientData;
}


/* Get Signed in Pathologist's Patient */

exports.getMyPatients = async (req, res) => {

    if (req.user.type != "Pathologist") {
        res.redirect("profile")
    }
    else {

        // Get Pathologist ID from session
        const pathologist = req.user._id;

        // Get Pathologist Data from DB
        const pathologistReq = await Pathologist.findOne({ 'userId': pathologist });

        //Get Pathologist's assigned Patients & Data
        const patients = pathologistReq.assignedPatients;
        const myPatientsList = await getAssignedPatient(patients);

            // console.log("CheckPath#5: "+"id" + pathologist)
            // console.log("CheckPath#6: "+ 'path' + pathologistReq)

        return res.render('pathPatientsList', { myPatients: myPatientsList });

    }
}

/* Get all the Patients that are not assigened to a Pathologist yet */

async function getUnassigned() {

    const patients = await User.find().where('isAssigned').equals("false");

        //console.log("CheckPath#7: "+ patients)

    return patients

}

/* Get pathologist & patient data for Diagnosing & Report */

exports.getPatAndPath = async (req, res) => {

    const patientId = req.body.patient;    
    const Path = req.user

    const patientData = await User.findById(patientId)

        // console.log("Check#8: PathologistEmail"+ Path.email)
        // console.log("CheckPath#9: "+" patient ID: " + patientId);

    return res.render("pathGenReport", { patient: patientData, user: Path });

}
