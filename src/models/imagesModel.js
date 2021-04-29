const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imgPath:{
        type: String,
        required: true
    },
    imgName:{
        type:String,
        required
    },
    uploadDate:{
        type: Date,
        required:true
    },
    patientID:{
        type: String,
        required
    },
    pathologistID:{
        type:String,
        required
    },
   

})

module.exports = mongoose.model("Image", ImageSchema);
