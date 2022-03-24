
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
        const { nhid } = req.query;
        const reports = await Report.find({ nhid });
        context.res = {
            body:{
                success: true,
                data: {
                    reports
                },
                message: "All reports of the patient",
            }
        };
    } catch (err) {
        context.res = {
            body: {
                message : "Error in getting report"
            }
        }
    }
    context.done();
}