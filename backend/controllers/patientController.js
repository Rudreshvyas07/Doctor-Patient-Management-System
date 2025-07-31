const e = require('express');
const Patient = require('../models/patient');
const User = require('../models/User'); // For doctor lookup via code

// 🟢 Add Patient
exports.addPatient = async (req, res) => {
  try {
    const { doctorCode } = req.body;
 console.log("Adding patient with data:", doctorCode, req.body);
    if (!doctorCode) {
      return res.status(400).json({ message: 'Doctor code is required' });
    }

    const doctor = await User.findOne({ code: doctorCode });
    if (!doctor) {
      return res.status(400).json({ message: 'Invalid doctor code' });
    }

    // Auto-generate patient ID if not given
    if (!req.body.PatientID) {
      req.body.PatientID = `PID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    const patient = new Patient({
      ...req.body,
      doctor: doctor._id, // This links the patient to the doctor's _id
    });

    await patient.save();
    return res.status(201).json({ message: 'Patient added successfully', patient });

  } catch (err) {
    console.error('Error adding patient:', err);
    return res.status(500).json({ message: 'Failed to add patient', error: err.message });
  }
};


exports.getAllPatients = async (req, res) => {
  try {
    console.log("Fetching all patients with query:", req.query);
   const doctorCode = req.query.doctorCode || req.query.doctor;


    if (!doctorCode) {
      return res.status(400).json({ message: 'Doctor code is required' });
    }

    const name = req.query.name;
    let filter = { doctorCode }; // ✅ Match your schema field (string)

    if (name) {
      filter.Name = { $regex: name, $options: 'i' };
    }

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Patient.countDocuments(filter);
    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({
      patients,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
};


// 🟢 Edit Patient
exports.editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorCode } = req.body;

    if (!id || !doctorCode) {
      return res.status(400).json({ message: 'Patient ID and doctor code are required' });
    }

    const patient = await Patient.findOne({ _id: id, doctorCode });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found or unauthorized' });
    }

    const updated = await Patient.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json({ message: 'Patient updated', patient: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update patient', error: err.message });
  }
};
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorCode } = req.query;

    console.log("Delete Request => ID:", id, "| doctorCode:", doctorCode);

    if (!id || !doctorCode) {
      return res.status(400).json({ message: 'Patient ID and doctor code are required' });
    }

    const patient = await Patient.findOne({ _id: id, doctorCode });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found or unauthorized' });
    }

    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: 'Patient deleted' });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ message: 'Failed to delete patient', error: err.message });
  }
};
