import mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ReportSchema = new Schema({
    reportID: Schema.Types.ObjectId,
    genDate: {
        type: Date,
        required: 'Enter Report Generation date'
    },
    patientID: {
        type: Number,
        required: 'Enter Last Name'
    },
    pathologistID: {
        type: Number,
        required: 'Enter Email'
    },
    TumorID: {
        type:Number,
        required:'',
    }
});