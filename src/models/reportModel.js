const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reportID: Schema.Types.ObjectId,
    genDate: {
        type: Date,
        required
    },
    patientID: {
        type: String,
        required
    },
    pathologistID: {
        type: String,
        required
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
