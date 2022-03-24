const mongoose = require('mongoose');
const {Slot} = require('utils');
const appointSchema = mongoose.Schema({
    patId: {
        type: Number,
        ref: 'Patient'
    },
    docId: {
        type: Number,
        ref: 'Doctor'
    },
    slot: {
        type: Slot,
    },
    date:{
        type: Date,
    },
    description: {
        type: String,
    },
    images: [{
        type: String,
    }]
})

module.exports = mongoose.model("Appointment", appointSchema)
