
const db = process.env["DATABASE"];
const mongoose = require('mongoose');
const Appointment = require('../models/AppointmentModel')
const Doctor = require('../models/DoctorModel')
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
    const {
    patId,
    docId,
    slot,
    date,
    description,
    images} = req.body;
    try {
        const doctor = await Doctor.find({regId: docId})[0];
        const docAppoints = await Appointment.find({docId, date, slot});
        const docSlots = doctor.availability;
        if (docAppoints.length > 0) {
            context.res = {
                body: {
                    error : "Doctor already appointed this time"
                }
            }
            context.done();
            return;
        }
        docSlots.forEach(async (docSlot)=>{
            if(docSlot.startTime === slot.startTime && docSlot.endTime === slot.endTime){
                const appointment = new Appointment({patId, docId, slot, date, description, images})
                await appointment.save();
                context.res = {
                    body: {
                        message: "Appointment booked"
                    }
                }
                context.done();
                return;
            }
        })
        context.res = {
            body: {
                error : "Doctor not available this time"
            }
        }
        context.done();
    }catch(err){
        context.res = {
            body: {
                error : "Internal Server Error"
            }
        }
        context.done();
    }

}
