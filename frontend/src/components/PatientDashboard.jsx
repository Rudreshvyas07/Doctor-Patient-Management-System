import { useState, useEffect } from "react";
import React from "react";
import AddPatient from "./addpatient";
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// No dummy data; start with empty patient list

// Define the fields to show by default
const visibleFields = [
  { key: "number", label: "No." },
  { key: "Name", label: "Name" },
  { key: "Age", label: "Age" },
  { key: "Gender", label: "Gender" },
  { key: "PhoneNumber", label: "Phone" },
];

// All fields for horizontal scroll
const allFields = [
  { key: "number", label: "No." },
  { key: "Name", label: "Name" },
  { key: "Age", label: "Age" },
  { key: "Gender", label: "Gender" },
  { key: "Address", label: "Address" },
  { key: "MartialStatus", label: "Marital Status" },
  { key: "occupation", label: "Occupation" },
  { key: "PhoneNumber", label: "Phone" },
  { key: "City", label: "City" },
  { key: "dateofVisit", label: "Date of Visit" },
  { key: "present_Complaint", label: "Complaint" },
  { key: "diagnosis", label: "Diagnosis" },
  { key: "Rubrictaken", label: "Rubric" },
  { key: "remedy", label: "Remedy" },
  { key: "potency", label: "Potency" },
  { key: "duration", label: "Duration" },
];

export default function PatientDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('patients'); // 'patients' or 'analytics'
  const [patients, setPatients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAllFields, setShowAllFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [profile, setProfile] = useState({
    fullName: localStorage.getItem('doctorName') || '',
    email: localStorage.getItem('doctorEmail') || '',
    medicalField: localStorage.getItem('doctorMedicalField') || '',
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [billPatient, setBillPatient] = useState(null);
  const billFieldLabels = [
    'Consultation charges',
    'Mother Tincher',
    'Medicine charges',
    'Biochemic tablet charges',
  ];
  const [billFields, setBillFields] = useState(['', '', '', '']);

  // Handle profile edit
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
  const handleProfileSave = () => {
    localStorage.setItem('doctorName', profile.fullName);
    localStorage.setItem('doctorEmail', profile.email);
    localStorage.setItem('doctorMedicalField', profile.medicalField);
    setShowSettings(false);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Fetch patients from backend on mount and when searchTerm changes
  useEffect(() => {
    const fetchPatients = async () => {
      setLoading(true);
      try {
        const doctorId = localStorage.getItem('doctorId');
        let url = `http://localhost:5000/api/patient/all?doctor=${doctorId}`;
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

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/patient/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPatients(patients.filter((p) => p._id !== id));
      } else {
        // Optionally show error
      }
    } catch (err) {
      // Optionally show error
    }
  };

  // Edit patient modal state
  const [editPatient, setEditPatient] = useState(null);
  const [editForm, setEditForm] = useState({});

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
      const res = await fetch(`http://localhost:5000/api/patient/${editPatient._id}`, {
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

  const handleAddPatient = (newPatient) => {
    setPatients([
      ...patients,
      {
        id: patients.length + 1,
        status: "Pending",
        ...newPatient,
      },
    ]);
    setShowModal(false);
  };

  const fieldsToShow = showAllFields ? allFields : visibleFields;

  // CSV download handler
  const handleDownloadCSV = () => {
    const fields = allFields;
    const header = fields.map(f => f.label).join(",");
    const rows = patients.map(p =>
      fields.map(f => {
        let val = p[f.key];
        if (f.key === 'dateofVisit' && val) {
          val = new Date(val).toLocaleDateString();
        }
        if (typeof val === 'string') {
          val = '"' + val.replace(/"/g, '""') + '"';
        }
        return val ?? '';
      }).join(",")
    );
    const csvContent = [header, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'patients.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadBillPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Ashish Homeo Clinic', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Patient: ${billPatient.Name || ''}`, 20, 35);
    let startY = 50;
    const rowHeight = 12;
    doc.setLineWidth(0.5);
    doc.rect(20, startY, 170, rowHeight * 5 + 10);
    doc.line(20, startY + rowHeight, 190, startY + rowHeight);
    doc.text('Description', 30, startY + 9);
    doc.text('Amount', 150, startY + 9);
    let total = 0;
    billFieldLabels.forEach((label, idx) => {
      const y = startY + rowHeight * (idx + 1);
      doc.line(20, y + rowHeight, 190, y + rowHeight);
      doc.text(label, 30, y + 9);
      const value = parseFloat(billFields[idx]) || 0;
      total += value;
      doc.text(value ? value.toFixed(2) : '', 150, y + 9);
    });
    doc.setFont(undefined, 'bold');
    doc.text('Total', 30, startY + rowHeight * 5 + 9);
    doc.text(total.toFixed(2), 150, startY + rowHeight * 5 + 9);
    doc.setFont(undefined, 'normal');
    doc.line(120, startY, 120, startY + rowHeight * 5 + 10);
    doc.line(20, startY, 20, startY + rowHeight * 5 + 10);
    doc.line(190, startY, 190, startY + rowHeight * 5 + 10);
    doc.save(`Bill_${billPatient.Name || 'patient'}.pdf`);
    setBillPatient(null);
  };

  // --- Analytics calculations (reuse patient data) ---
  const totalPatients = patients.length;
  const now = new Date();
  const newPatientsThisMonth = patients.filter(p => {
    if (!p.dateofVisit) return false;
    const d = new Date(p.dateofVisit);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const genderCounts = patients.reduce((acc, p) => {
    const g = (p.Gender || 'Other').toLowerCase();
    acc[g] = (acc[g] || 0) + 1;
    return acc;
  }, {});
  const genderData = [
    { name: 'Male', value: genderCounts['male'] || 0 },
    { name: 'Female', value: genderCounts['female'] || 0 },
    { name: 'Other', value: genderCounts['other'] || 0 },
  ];
  const genderColors = ['#36A2EB', '#FF6384', '#FFCE56'];
  const ageGroups = {};
  patients.forEach(p => {
    const age = parseInt(p.Age);
    if (!isNaN(age)) {
      const group = `${Math.floor(age/10)*10}-${Math.floor(age/10)*10+9}`;
      ageGroups[group] = (ageGroups[group] || 0) + 1;
    }
  });
  const ageData = Object.entries(ageGroups).map(([range, count]) => ({ range, count }));
  const diagCounts = {};
  patients.forEach(p => {
    if (p.diagnosis) {
      diagCounts[p.diagnosis] = (diagCounts[p.diagnosis] || 0) + 1;
    }
  });
  const diagData = Object.entries(diagCounts)
    .map(([diagnosis, count]) => ({ diagnosis, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex flex-col py-6 px-4 min-h-screen">
        <h2 className="text-2xl font-bold mb-8 text-center">Dashboard</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <button className="w-full text-left font-semibold bg-white text-blue-600 border border-blue-600 rounded px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors shadow" onClick={() => setTab('patients')}>Patients</button>
            </li>
            <li>
              <button className="w-full text-left font-semibold bg-white text-blue-600 border border-blue-600 rounded px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors shadow" onClick={() => setTab('analytics')}>Analytics</button>
            </li>
            <li>
              <button className="w-full text-left font-semibold bg-white text-blue-600 border border-blue-600 rounded px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors shadow" onClick={() => setShowModal(true)}>Add Patient</button>
            </li>
            <li>
              <button className="w-full text-left font-semibold bg-white text-blue-600 border border-blue-600 rounded px-3 py-2 hover:bg-blue-600 hover:text-white transition-colors shadow" onClick={() => setShowSettings(true)}>Settings</button>
            </li>
          </ul>
        </nav>
        <button className="w-full mt-8 text-left font-semibold bg-red-600 text-black border border-red-600 rounded px-3 py-2 hover:bg-red-700 transition-colors shadow" onClick={handleLogout}>Logout</button>
        <div className="mt-auto text-xs text-gray-400">&copy; 2024 DRM</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 min-w-0">
        {/* Tabs at the top */}
        <div className="flex gap-4 mb-6">
          <button onClick={() => setTab('patients')} className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'patients' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 bg-gray-200'}`}>Patients</button>
          <button onClick={() => setTab('analytics')} className={`px-6 py-2 rounded-t-lg font-semibold border-b-2 ${tab === 'analytics' ? 'border-blue-600 text-blue-600 bg-white' : 'border-transparent text-gray-500 bg-gray-200'}`}>Analytics</button>
        </div>
        {/* Tab content */}
        {tab === 'patients' && (
          <>
            {/* --- All previous patient management UI --- */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Patients</h1>
                <p className="text-gray-500 dark:text-gray-300">Welcome! Manage your patients here.</p>
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-end mb-4 gap-2">
              <button
                className="bg-green-600 text-black font-semibold px-4 py-2 rounded shadow hover:bg-green-700 transition-colors"
                onClick={handleDownloadCSV}
              >
                Download CSV
              </button>
              {showAllFields ? (
                <button
                  className="bg-blue-600 text-black font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors"
                  onClick={() => setShowAllFields(false)}
                >
                  Back
                </button>
              ) : (
                <button
                  className="bg-gray-700 text-black font-semibold px-4 py-2 rounded shadow hover:bg-gray-800 transition-colors"
                  onClick={() => setShowAllFields(true)}
                >
                  Show All Fields
                </button>
              )}
            </div>
            <div className="bg-gray-900 rounded-lg shadow p-2 w-full">
              <div
                className="overflow-x-auto w-full"
                style={{ minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}
              >
                {loading ? (
                  <div className="text-center text-white py-8">Loading patients...</div>
                ) : (
                <table className="min-w-[1200px] w-full text-sm text-gray-200">
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
                          <button className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600" onClick={() => openEditModal(patient)}>Edit</button>
                          <button className="bg-red-500 text-black px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(patient._id)}>Delete</button>
                          <button
                            className="bg-yellow-600 text-black px-3 py-1 rounded hover:bg-yellow-700"
                            onClick={() => {
                              setBillPatient(patient);
                              setBillFields(['', '', '', '']);
                            }}
                          >
                            Download Bill
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                )}
              </div>
            </div>
            {/* Add Patient Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-4 w-full max-w-sm relative max-h-[90vh] overflow-auto">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl" onClick={() => setShowModal(false)}>&times;</button>
                  <AddPatient onClose={() => setShowModal(false)} onAddPatient={handleAddPatient} />
                </div>
              </div>
            )}
            {/* Settings Modal */}
            {showSettings && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
                  <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl" onClick={() => setShowSettings(false)}>&times;</button>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Edit Profile</h2>
                  <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleProfileSave(); }}>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 font-medium">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={profile.fullName}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 font-medium">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm mb-1 font-medium">Medical Field</label>
                      <input
                        type="text"
                        name="medicalField"
                        value={profile.medicalField}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowSettings(false)}>Cancel</button>
                      <button type="submit" className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Edit Patient Modal */}
            {editPatient && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
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
            {billPatient && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto">
                  <h2 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-white">Ashish Homeo Clinic</h2>
                  <div className="mb-2 text-lg font-semibold text-center">
                    Patient: {billPatient.Name}
                  </div>
                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      handleDownloadBillPDF();
                    }}
                  >
                    {billFieldLabels.map((label, idx) => (
                      <div key={idx} className="mb-2">
                        <label className="block text-gray-700 dark:text-gray-200 mb-1">{label}</label>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={billFields[idx]}
                          onChange={e => setBillFields(fields => fields.map((f, i) => (i === idx ? e.target.value : f)))}
                          placeholder={label}
                          className="w-full px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                    ))}
                    <div className="mb-2 font-bold text-right text-lg">
                      Total: ₹{billFields.reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 rounded bg-blue-600 text-black"
                      >
                        Download Bill
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 rounded bg-gray-400 text-black"
                        onClick={() => setBillPatient(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
        {tab === 'analytics' && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Analytics & Insights</h1>
            <p className="text-gray-500 dark:text-gray-300 mb-6">Visualize your patient data and trends.</p>
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{totalPatients}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold">Total Patients</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-green-600 mb-2">{newPatientsThisMonth}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold">New This Month</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 flex flex-col items-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">{Object.keys(diagCounts).length}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold">Unique Diagnoses</div>
              </div>
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Gender Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={genderData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                      {genderData.map((entry, idx) => (
                        <Cell key={`cell-${idx}`} fill={genderColors[idx % genderColors.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Age Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={ageData}>
                    <XAxis dataKey="range" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#36A2EB" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8">
              <h2 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Top Diagnoses</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={diagData} layout="vertical">
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="diagnosis" type="category" width={120} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#FF6384" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
