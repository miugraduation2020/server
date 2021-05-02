const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    reportID: Schema.Types.ObjectId,
    genDate: {
        type: Date,
        require:true
    },
    patientID: {
        type: String,
        require:true
    },
    pathologistID: {
        type: String,
        require:true

    },
    tumorID: {
        type:Number,
        require:true
    },
    imageID:{
        type:String,
        require:true
    },
    pathComments:{
        type:String
    }
});

mongoose.model("Report", ReportSchema);
