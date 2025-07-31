import React, { useState } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

const AddPatient = ({ onClose, onAddPatient }) => {
  const [form, setForm] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Address: '',
    MartialStatus: '',
    occupation: '',
    PhoneNumber: '',
    City: '',
    dateofVisit: '',
    nextVisitDate: '', // Added field
    present_Complaint: '',
    diagnosis: '',
    Rubrictaken: '',
    remedy: '',
    potency: '',
    duration: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');
  try {
    const doctorCode = localStorage.getItem('doctorCode');
    if (!doctorCode) {
      setMessage('Doctor code not found in local storage');
      return;
    }

    const res = await fetch(`${API_BASE_URL}/api/patient/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, doctorCode }), // only doctorCode
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Patient added successfully!');
      if (onAddPatient) onAddPatient(form);
      if (onClose) onClose();
    } else {
      setMessage(data.message || 'Failed to add patient');
    }
  } catch (err) {
    console.error('Error adding patient:', err);
    setMessage('Server error: ' + (err.message || err));
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[600px] w-full">
      <div className="bg-white/30 dark:bg-gray-900/70 shadow-2xl rounded-3xl p-8 max-w-xl w-full border border-white/30 dark:border-gray-700/60 backdrop-blur-[6px] animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-full mb-2">
            <FaUserPlus className="w-8 h-8 text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow animate-fade-in">Add Patient</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in delay-100">Fill in the details below to add a new patient.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in delay-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <input name="Name" value={form.Name} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" required />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Name</label>
            </div>
            <div className="relative">
              <input name="Age" type="number" value={form.Age} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" required />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Age</label>
            </div>
            <div className="relative">
              <select name="Gender" value={form.Gender} onChange={handleChange} className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" required>
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Gender</label>
            </div>
            <div className="relative">
              <input name="Address" value={form.Address} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" required />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Address</label>
            </div>
            <div className="relative">
              <select name="MartialStatus" value={form.MartialStatus} onChange={handleChange} className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" required>
                <option value="" disabled>Select Marital Status</option>
                <option value="Married">Married</option>
                <option value="Unmarried">Unmarried</option>
              </select>
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Marital Status</label>
            </div>
            <div className="relative">
              <input name="occupation" value={form.occupation} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Occupation</label>
            </div>
            <div className="relative">
              <input name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Phone Number</label>
            </div>
            <div className="relative">
              <input name="City" value={form.City} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">City</label>
            </div>
            <div className="relative">
              <input name="dateofVisit" type="date" value={form.dateofVisit} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Date of Visit</label>
            </div>
            {/* Next Date of Visit */}
            <div className="relative">
              <input name="nextVisitDate" type="date" value={form.nextVisitDate} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Next Date of Visit</label>
            </div>
            <div className="relative">
              <input name="present_Complaint" value={form.present_Complaint} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Present Complaint</label>
            </div>
            <div className="relative">
              <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Diagnosis</label>
            </div>
            <div className="relative">
              <input name="Rubrictaken" value={form.Rubrictaken} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Rubric Taken</label>
            </div>
          </div>
          <fieldset className="border border-gray-300 dark:border-gray-700 rounded-xl p-4 mb-2 bg-white/40 dark:bg-gray-800/40">
            <legend className="text-base font-semibold text-gray-700 dark:text-gray-200 px-2">Prescription</legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <input name="remedy" value={form.remedy} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Remedy</label>
              </div>
              <div className="relative">
                <input name="potency" value={form.potency} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Potency</label>
              </div>
              <div className="relative">
                <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder=" " className="peer w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-focus:-top-4 peer-focus:text-xs peer-focus:text-blue-600 dark:peer-focus:text-blue-300 bg-white/80 dark:bg-gray-900/80 px-1 rounded pointer-events-none">Duration</label>
              </div>
            </div>
          </fieldset>
          <div className="flex justify-end gap-2 mt-4">
            {onClose && (
              <button type="button" className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition-all" onClick={onClose} disabled={loading}>Cancel</button>
            )}
            <button type="submit" className="px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700 animate-fade-in delay-300" disabled={loading}>
              {loading ? 'Adding...' : 'Add Patient'}
            </button>
          </div>
          {message && <div className={`text-center text-sm mt-2 px-4 py-2 rounded-xl font-semibold ${message.includes('success') ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'} animate-fade-in`}>{message}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
