const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    imgPath:{
        type: String,
        require: true
    },
    imgName:{
        type:String,
        require:true
    },
    uploadDate:{
        type: Date,
        require:true
    },
    patientID:{
        type: String,
        require:true
    },
    pathologistID:{
        type:String,
        require:true
    },
    diagnosis:{
        type:String,
        require:true
    }
   

})

module.exports = mongoose.model("Image", ImageSchema);
