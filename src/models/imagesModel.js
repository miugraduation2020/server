import mongoose from 'mongoose';


const Schema = mongoose.Schema;

export const ImageSchema = new Schema({
    imageID: Schema.Types.ObjectId,
    uploadDate: {
        type: Date,
        required: 'Enter upload date'
    },
    imgPath: {
        type: String,
        required: 'Enter Last Name'
    },
    patientID: {
        type: Number,
        required: 'Enter Email'
    },
    
});