const Patient = require('../models/patient');

exports.addPatient = async (req, res) => {
  try {
    if (!req.body.doctor || req.body.doctor === "null") {
      return res.status(400).json({ message: "Valid doctorId required" });
    }
    // Auto-generate PatientID if not provided
    if (!req.body.PatientID) {
      req.body.PatientID = 'PID-' + Date.now() + '-' + Math.floor(Math.random()*1000);
    }
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: 'Patient added successfully', patient });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add patient', error: err.message });
  }
};

exports.getAllPatients = async (req, res) => {
  try {
    const doctorId = req.query.doctor;
    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID required' });
    }

    const name = req.query.name;
    let filter = { doctor: doctorId };
    if (name) {
      filter.Name = { $regex: name, $options: 'i' };
    }

    // Pagination logic
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Patient.countDocuments(filter);
    const patients = await Patient.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    res.status(200).json({ patients, total, page, totalPages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patients', error: err.message });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Patient ID required' });
    const deleted = await Patient.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete patient', error: err.message });
  }
};

exports.editPatient = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Patient ID required' });
    const updated = await Patient.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Patient not found' });
    res.status(200).json({ message: 'Patient updated', patient: updated });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update patient', error: err.message });
  }
};
