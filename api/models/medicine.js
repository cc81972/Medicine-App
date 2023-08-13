const mongoose = require('mongoose')

const MedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dosage: {
        type: Number,
        required: true,
    },
    time: {
        type: String,
        required: false,
    }
});

const MedModel = mongoose.model("test1",MedSchema)
module.exports = MedModel;