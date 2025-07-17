import React, { useState } from 'react';

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
      const doctorId = localStorage.getItem('doctorId');
      const res = await fetch('http://localhost:5000/api/patient/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, doctor: doctorId }),
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
      setMessage('Server error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Patient</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="Name" value={form.Name} onChange={handleChange} placeholder="Name" className="w-full p-2 border rounded" required />
        <input name="Age" type="number" value={form.Age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" required />
        <select name="Gender" value={form.Gender} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <input name="Address" value={form.Address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" required />
        <select name="MartialStatus" value={form.MartialStatus} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Marital Status</option>
          <option value="Married">Married</option>
          <option value="Unmarried">Unmarried</option>
        </select>
        <input name="occupation" value={form.occupation} onChange={handleChange} placeholder="Occupation" className="w-full p-2 border rounded" />
        <input name="PhoneNumber" value={form.PhoneNumber} onChange={handleChange} placeholder="Phone Number" className="w-full p-2 border rounded" />
        <input name="City" value={form.City} onChange={handleChange} placeholder="City" className="w-full p-2 border rounded" />
        <input name="dateofVisit" type="date" value={form.dateofVisit} onChange={handleChange} placeholder="Date of Visit" className="w-full p-2 border rounded" />
        <input name="present_Complaint" value={form.present_Complaint} onChange={handleChange} placeholder="Present Complaint" className="w-full p-2 border rounded" />
        <input name="diagnosis" value={form.diagnosis} onChange={handleChange} placeholder="Diagnosis" className="w-full p-2 border rounded" />
        <input name="Rubrictaken" value={form.Rubrictaken} onChange={handleChange} placeholder="Rubric Taken" className="w-full p-2 border rounded" />
        <fieldset className="border border-gray-300 rounded p-3 mb-2">
          <legend className="text-base font-semibold text-gray-700 px-2">Prescription</legend>
          <div className="flex flex-col gap-2">
            <input name="remedy" value={form.remedy} onChange={handleChange} placeholder="Remedy" className="w-full p-2 border rounded" />
            <input name="potency" value={form.potency} onChange={handleChange} placeholder="Potency" className="w-full p-2 border rounded" />
            <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="Duration" className="w-full p-2 border rounded" />
          </div>
        </fieldset>
        <div className="flex justify-end gap-2">
          {onClose && (
            <button type="button" className="px-4 py-2 bg-gray-300 text-black rounded" onClick={onClose} disabled={loading}>Cancel</button>
          )}
          <button type="submit" className="bg-blue-700 text-black p-2 rounded hover:bg-blue-900 shadow font-semibold" disabled={loading}>
            {loading ? 'Adding...' : 'Add Patient'}
          </button>
        </div>
        {message && <div className="text-center text-sm mt-2 text-blue-600">{message}</div>}
      </form>
    </div>
  );
};

export default AddPatient;
