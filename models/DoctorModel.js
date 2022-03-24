const mongoose = require('mongoose');
const {Slot} = require('./util')

const doctorSchema = mongoose.Schema({
    regId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    availability: [{
        type: Slot
    }],
})

module.exports = mongoose.model("Doctor", doctorSchema)
