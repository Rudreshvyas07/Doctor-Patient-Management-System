const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  Name: String,
  Age: Number,
  Gender: String,
  Address: String,
  MartialStatus: String,
  occupation: String,
  PhoneNumber: String,
  City: String,
  dateofVisit: Date,
  present_Complaint: String,
  diagnosis: String,
  Rubrictaken: String,
  remedy: String,
  potency: String,
  duration: Number,
  nextVisitDate: Date,
  PatientID: String, // Optional
  doctorCode: {
    type: String, // Use String so 0123 won't be converted to 123
    required: true
  }
});

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
