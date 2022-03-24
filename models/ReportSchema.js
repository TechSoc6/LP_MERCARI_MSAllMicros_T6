const mongoose = require("mongoose")
const reportSchema = mongoose.Schema({
    nhid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    docId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    description: {
        type: String,
        required: true
    },
    images: [{
        type: String,
    }]
})

module.exports = mongoose.model("Report", reportSchema)