require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const patientRoutes = require('./routes/patient');
const connectDB = require('./utils/database');
const registerRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();
// app.use('/api/auth', authRoutes);
// app.use('/api/patient', patientRoutes);
registerRoutes(app);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 