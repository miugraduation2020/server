const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reportID: Schema.Types.ObjectId,
    genDate: {
        type: Date,
        required: 'Enter Report Generation date'
    },
    patientID: {
        type: String,
        required: 'Enter Last Name'
    },
    pathologistID: {
        type: String,
        required: 'Enter Email'
    },
    tumorID: {
        type:Number,
        required:true,
    },
    imageID:{
        type:String,
        required:true,
    }
});

mongoose.model("Report", ReportSchema);
