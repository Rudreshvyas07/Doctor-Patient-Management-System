const mongoose = require("mongoose");
const patientSchema = new mongoose.Schema({
    Name:
    {
        type: String,
    },
    Age:
    {
        type: Number,
    },
    Gender:
    {
        type: String,
    },
    Address:
    {
        type: String,
    },
    MartialStatus:
    {
        type: String,
    },
    occupation:
    {
        type: String,
    },
    PhoneNumber:
    {
        type: String,
    },
    City:
    {
        type: String,
    },
    dateofVisit:
    {
        type: Date,
    },
    present_Complaint:
    {
        type: String,
    },
    diagnosis:
    {
        type: String,
    },
    Rubrictaken:
    {
        type: String,
    },
    remedy:
    {
        type:String,

    },
    potency:
    { type:String,

    },
    duration:
    {
        type:Number,
    },
    nextVisitDate: {
        type: Date,
    },
    PatientID: {
        type: String,
        // not required, not unique
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    
});
const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;