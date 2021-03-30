const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PathologistSchema = new Schema({
    userId:
    {
        type: String,
        required: "User id must be addded"
    },
    reportsGenerated: {
        type: Number,
        default: 0
    }
})
mongoose.model("Pathologist", PathologistSchema);