const authRoutes = require('./auth');
const patientRoutes = require('./patient');

module.exports = (app) => {
  app.use('/api/auth', authRoutes);
  app.use('/api/patient', patientRoutes);
}; 