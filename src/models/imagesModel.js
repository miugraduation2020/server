const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imgPath:{
        type: String,
        required: true
    },
    imgNameDB:{
        type:String,
        required: true
    },
    uploadDate:{
        type: Date,
        required:true
    },
    patientID:{
        type: Number,
        required:true
    }

})

module.exports = mongoose.model("Image", ImageSchema);
