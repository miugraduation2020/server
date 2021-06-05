const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TumorSchema = new Schema({
    TumorID: Schema.Types.ObjectId,

    tumorName: {
        type:String,
        required:true,
    },
    tumorDescription:{
        type:String,
        required:true,
    },
    tumorClassNumber:{
        type:String,
        required: true
    }
});

mongoose.model("Tumor", TumorSchema);



