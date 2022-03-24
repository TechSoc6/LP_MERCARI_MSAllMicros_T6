const mongoose = require('mongoose');
const patientSchema = mongoose.Schema({
    nhid: {
        type: Number,
        ref: 'Patient'
    },
    gender:{
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    address:{
        type: String
    }
})

module.exports = mongoose.model("Patient", patientSchema)
