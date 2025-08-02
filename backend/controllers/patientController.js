const mongoose = require("mongoose");
const Patient = require("../models/patient");

// ✅ Add Patient
exports.addPatient = async (req, res) => {
  try {
    const { doctorCode } = req.body;
    if (!doctorCode) return res.status(400).json({ message: "Doctor code is required" });

    // Validate Dates
    const { dateofVisit, nextVisitDate } = req.body;
    if (dateofVisit && isNaN(Date.parse(dateofVisit))) {
      return res.status(400).json({ message: "Invalid dateofVisit" });
    }
    if (nextVisitDate && isNaN(Date.parse(nextVisitDate))) {
      return res.status(400).json({ message: "Invalid nextVisitDate" });
    }

    // Generate unique PatientID if not provided
    if (!req.body.PatientID) {
      req.body.PatientID = `PID-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }

    const patient = new Patient({
      ...req.body,
      doctorCode,
    });

    await patient.save();
    res.status(201).json({ message: "Patient added successfully", patient });
  } catch (err) {
    console.error("Add error:", err);
    res.status(500).json({ message: "Failed to add patient", error: err.message });
  }
};

// ✅ Get All Patients
exports.getAllPatients = async (req, res) => {
  try {
    const doctorCode = req.query.doctor || req.query.doctorCode; // support both
    if (!doctorCode) {
      return res.status(400).json({ message: "Doctor code is required" });
    }

    const name = req.query.name;
    const filter = { doctorCode };
    if (name) {
      filter.Name = { $regex: name, $options: "i" };
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Patient.countDocuments(filter);
    const patients = await Patient.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      patients,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    console.error("Get error:", err);
    res.status(500).json({ message: "Failed to fetch patients", error: err.message });
  }
};

// ✅ Edit Patient
exports.editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorCode } = req.body;

    if (!id || !doctorCode) {
      return res.status(400).json({ message: "Patient ID and doctor code are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const existing = await Patient.findOne({ _id: id, doctorCode });
    if (!existing) {
      return res.status(404).json({ message: "Patient not found or unauthorized" });
    }

    const updated = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ message: "Patient updated successfully", patient: updated });
  } catch (err) {
    console.error("Edit error:", err);
    res.status(500).json({ message: "Failed to update patient", error: err.message });
  }
};

// ✅ Delete Patient
exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorCode = req.query.doctorCode || req.query.doctor;

    if (!id || !doctorCode) {
      return res.status(400).json({ message: "Patient ID and doctor code are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid patient ID" });
    }

    const existing = await Patient.findOne({ _id: id, doctorCode });
    if (!existing) {
      return res.status(404).json({ message: "Patient not found or unauthorized" });
    }

    await Patient.findByIdAndDelete(id);
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Failed to delete patient", error: err.message });
  }
};
