import React, { useState, useEffect } from 'react';
import PatientDetails from './PatientDetails';
import AddPatient from './addpatient';
import API_BASE_URL from '../config/api';

const visibleFields = [
  { key: 'number', label: 'No.' },
  { key: 'Name', label: 'Name' },
  { key: 'Age', label: 'Age' },
  { key: 'Gender', label: 'Gender' },
  { key: 'PhoneNumber', label: 'Phone' },
];

const allFields = [
  { key: 'number', label: 'No.' },
  { key: 'Name', label: 'Name' },
  { key: 'Age', label: 'Age' },
  { key: 'Gender', label: 'Gender' },
  { key: 'Address', label: 'Address' },
  { key: 'MartialStatus', label: 'Marital Status' },
  { key: 'occupation', label: 'Occupation' },
  { key: 'PhoneNumber', label: 'Phone' },
  { key: 'City', label: 'City' },
  { key: 'dateofVisit', label: 'Date of Visit' },
  { key: 'present_Complaint', label: 'Complaint' },
  { key: 'diagnosis', label: 'Diagnosis' },
  { key: 'Rubrictaken', label: 'Rubric' },
  { key: 'remedy', label: 'Remedy' },
  { key: 'potency', label: 'Potency' },
  { key: 'duration', label: 'Duration' },
];

const PatientDashboardSection = () => {
  const [patients, setPatients] = useState([]);
  const [showAllFields, setShowAllFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [editPatient, setEditPatient] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [detailsPatient, setDetailsPatient] = useState(null);
  const [billPatient, setBillPatient] = useState(null);
  const [billFields, setBillFields] = useState(['', '', '', '']);

  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
          const doctorCode = localStorage.getItem("doctorCode");
let url = `${API_BASE_URL}/api/patient/all?doctorCode=${doctorCode}`;



        if (searchTerm) {
          url += `&name=${encodeURIComponent(searchTerm)}`;
        }
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok && Array.isArray(data.patients)) {
          setPatients(data.patients.map((p, idx) => ({ number: idx + 1, ...p })));
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, [searchTerm]);

  // Download all patients as CSV
  const handleDownloadAll = () => {
    if (!patients.length) return;
    const replacer = (key, value) => (value === null ? '' : value);
    const fieldsToShow = showAllFields ? allFields : visibleFields;
    const header = fieldsToShow.map(f => f.key);
    const csv = [
      header.join(','),
      ...patients.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(',')),
    ].join('\r\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Bill modal handlers
  const openBillModal = (patient) => {
    setBillPatient(patient);
    setBillFields(['', '', '', '']);
  };
  const closeBillModal = () => {
    setBillPatient(null);
    setBillFields(['', '', '', '']);
  };
  const handleBillFieldChange = (idx, value) => {
    setBillFields(fields => fields.map((f, i) => (i === idx ? value : f)));
  };
  const handleDownloadBill = () => {
    window.print(); // MVP: print the modal
  };

  // Edit patient modal handlers
  const openEditModal = (patient) => {
    setEditPatient(patient);
    setEditForm(patient);
  };
  const closeEditModal = () => {
    setEditPatient(null);
    setEditForm({});
  };
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  const handleEditSave = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/patient/${editPatient._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const data = await res.json();
        setPatients(patients.map((p) => p._id === editPatient._id ? { ...data.patient, number: p.number } : p));
        closeEditModal();
      } else {
        // Optionally show error
      }
    } catch (err) {
      // Optionally show error
    }
  };

  const handleDelete = async (id) => {
  try {
    const doctorCode = localStorage.getItem("doctorCode"); // Get doctorCode from localStorage
    const res = await fetch(`${API_BASE_URL}/api/patient/${id}?doctorCode=${doctorCode}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setPatients(patients.filter((p) => p._id !== id));
    } else {
      const data = await res.json();
      console.error("Delete failed:", data.message);
      alert(`Delete failed: ${data.message}`);
    }
  } catch (err) {
    console.error("Error deleting patient:", err);
    alert("An unexpected error occurred while deleting the patient.");
  }
};

  const fieldsToShow = showAllFields ? allFields : visibleFields;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Patients</h1>
          <p className="text-gray-500 dark:text-gray-300">Welcome! Manage your patients here.</p>
        </div>
        <button
          className="bg-green-600 text-white font-semibold px-4 py-2 rounded shadow hover:bg-green-700 transition-colors mr-2"
          onClick={handleDownloadAll}
        >
          Download All Patient List
        </button>
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="bg-gray-900 rounded-lg shadow p-2 w-full">
        <div
          className="overflow-x-auto w-full"
          style={{ minHeight: '300px', maxHeight: '500px', overflowY: 'auto' }}
        >
          {loading ? (
            <div className="text-center text-white py-8">Loading patients...</div>
          ) : (
            <table className="min-w-[600px] w-full text-sm text-gray-200">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  {fieldsToShow.map((field) => (
                    <th key={field.key} className="px-4 py-2 text-left whitespace-nowrap">{field.label}</th>
                  ))}
                  <th className="px-4 py-2 text-left whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, idx) => (
                  <tr key={patient._id || idx} className="border-b border-gray-800 hover:bg-gray-800">
                    {fieldsToShow.map((field) => (
                      <td key={field.key} className="px-4 py-2 whitespace-nowrap">
                        {field.key === 'number'
                          ? idx + 1
                          : field.key === 'dateofVisit' && patient[field.key]
                            ? new Date(patient[field.key]).toLocaleDateString()
                            : patient[field.key]}
                      </td>
                    ))}
                    <td className="px-4 py-2 flex gap-2">
                      <button className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600" onClick={() => setDetailsPatient(patient)}>View Details</button>
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => openEditModal(patient)}>Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(patient._id)}>Delete</button>
                      <button className="bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700" onClick={() => openBillModal(patient)}>Download Bill</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {/* Patient Details Modal */}
      {detailsPatient && (
        <PatientDetails patient={detailsPatient} onClose={() => setDetailsPatient(null)} />
      )}
      {/* Bill Modal */}
      {billPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Patient Bill</h2>
              <button onClick={closeBillModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">&times;</button>
            </div>
            <table className="w-full text-sm mb-4">
              <tbody>
                {Object.entries(billPatient).filter(([key]) => key !== '_id' && key !== '__v' && key !== 'doctor' && key !== 'number').map(([key, value]) => (
                  <tr key={key}>
                    <td className="font-semibold capitalize pr-2 py-1 text-gray-700 dark:text-gray-200">{key.replace(/_/g, ' ')}</td>
                    <td className="py-1 text-gray-900 dark:text-white">{key === 'dateofVisit' ? new Date(value).toLocaleDateString() : value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">Custom Bill Fields</h3>
              {[0,1,2,3].map(idx => (
                <input
                  key={idx}
                  type="text"
                  value={billFields[idx]}
                  onChange={e => handleBillFieldChange(idx, e.target.value)}
                  placeholder={`Custom Field ${idx+1}`}
                  className="w-full mb-2 px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 rounded bg-blue-600 text-white print:hidden"
                onClick={handleDownloadBill}
              >
                Download Bill
              </button>
              <button type="button" className="px-4 py-2 rounded bg-gray-400 text-black print:hidden" onClick={closeBillModal}>Close</button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Patient Modal */}
      {editPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Patient</h2>
            <form onSubmit={e => { e.preventDefault(); handleEditSave(); }}>
              {Object.keys(editForm).map((key) => (
                key !== '_id' && key !== 'doctor' && key !== '__v' && key !== 'number' && (
                  <div key={key} className="mb-3">
                    <label className="block text-gray-700 dark:text-gray-200 mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                    <input
                      type="text"
                      name={key}
                      value={editForm[key] || ''}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                )
              ))}
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 rounded bg-gray-400 text-black" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PatientDashboardSection; 