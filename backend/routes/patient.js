const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');

router.post('/add', patientController.addPatient);
router.get('/all', patientController.getAllPatients);
router.delete('/:id', patientController.deletePatient);
router.put('/:id', patientController.editPatient);

module.exports = router; 