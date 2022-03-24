
const db = process.env["DATABASE"];
const mongoose = require('mongoose');
const Report = require('../models/ReportSchema')
const connectMongo = async () => {
    try {
        console.log("connecting mongoose");
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connect success");
    } catch (err) {
        console.log("Error in connecting database---->", err);
    }
}
connectMongo();

module.exports = async function (context, req) {
    try {
        const { nhid, docId, description, images } = req.body;
        let report = new Report({ nhid, docId, description, images })
        await report.save();
        
        context.res = {
            body:{
                success: true,
                data: {
                    report
                },
                message: "Report created!",
            }
        };
    } catch (err) {
        context.res = {
            body:{
                error : "Error in creating report"
            }
        }
    }
    context.done();
}