const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelSchema = new Schema({

    tumorID: {
        type:Number,
        required:true,
    },
    imageID:{
        type:String,
        required:true,
    },
    reportID:{
        type:String,
        required: true
    }
});

mongoose.model("Model", ModelSchema);



