const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

// Add a patient (expects doctorCode in req.body)
router.post('/add', patientController.addPatient);

// Get all patients (expects doctorCode in req.query)
router.get('/all', patientController.getAllPatients);

// Delete patient (expects doctorCode in req.query)
router.delete('/:id', patientController.deletePatient);

// Edit patient (expects doctorCode in req.body)
router.put('/:id', patientController.editPatient);

module.exports = router;
