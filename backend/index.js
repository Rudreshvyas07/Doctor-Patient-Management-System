require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// const authRoutes = require('./routes/auth');
// const patientRoutes = require('./routes/patient');
const registerRoutes = require('./routes');

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

// app.use('/api/auth', authRoutes);
// app.use('/api/patient', patientRoutes);
registerRoutes(app);

app.listen(5000, () => {
  console.log('Server running on port 5000');
}); 