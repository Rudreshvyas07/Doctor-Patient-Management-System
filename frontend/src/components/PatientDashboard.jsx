import { useState, useEffect } from "react";
import React from "react";
import AddPatient from "./addpatient";
import jsPDF from 'jspdf';
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import ThemeSwitcher from './ThemeSwitcher';
import { FaUserFriends, FaChartBar, FaUserCog, FaSignOutAlt, FaPlus } from 'react-icons/fa';
import API_BASE_URL from '../config/api';

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
  // Remove global includeTreatment state
  // Add per-patient treatment state
  const [treatmentChecked, setTreatmentChecked] = useState({});
  const [includeTreatment, setIncludeTreatment] = useState(false); // Only for modal

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
        let url = `${API_BASE_URL}/api/patient/all?doctor=${doctorId}`;
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
      const res = await fetch(`${API_BASE_URL}/api/patient/${id}`, { method: 'DELETE' });
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
    
    // Add treatment information if checkbox is checked
    if (includeTreatment && billPatient.remedy) {
      doc.setFontSize(12);
      doc.text('Treatment Details:', 20, startY);
      doc.setFontSize(10);
      doc.text(`Remedy: ${billPatient.remedy || 'N/A'}`, 20, startY + 8);
      doc.text(`Potency: ${billPatient.potency || 'N/A'}`, 20, startY + 16);
      doc.text(`Duration: ${billPatient.duration || 'N/A'}`, 20, startY + 24);
      startY += 40; // Move down to accommodate treatment info
    }
    
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
    setIncludeTreatment(false);
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
      <aside className="w-64 bg-white/30 dark:bg-gray-900/70 backdrop-blur-[8px] border-r border-white/30 dark:border-gray-700/60 shadow-2xl flex flex-col py-8 px-4 min-h-screen rounded-tr-3xl rounded-br-3xl animate-fade-in">
        <h2 className="text-3xl font-extrabold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow-lg tracking-wide">Dashboard</h2>
        <nav className="flex-1">
          <ul className="space-y-4">
            <li>
              <button className={`w-full flex items-center gap-3 text-left font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 hover:scale-[1.03] ${tab === 'patients' ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 text-white shadow-xl' : 'bg-white/60 dark:bg-gray-800/60 text-blue-700 dark:text-blue-200'}`} onClick={() => setTab('patients')}> <FaUserFriends className="text-2xl" /> Patients </button>
            </li>
            <li>
              <button className={`w-full flex items-center gap-3 text-left font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg hover:bg-blue-100 dark:hover:bg-blue-900/60 hover:scale-[1.03] ${tab === 'analytics' ? 'bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 text-white shadow-xl' : 'bg-white/60 dark:bg-gray-800/60 text-blue-700 dark:text-blue-200'}`} onClick={() => setTab('analytics')}> <FaChartBar className="text-2xl" /> Analytics </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-left font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg bg-gradient-to-r from-emerald-500 via-blue-500 to-indigo-500 text-white hover:from-emerald-600 hover:to-indigo-600 hover:scale-[1.03]" onClick={() => setShowModal(true)}> <FaPlus className="text-2xl" /> Add Patient </button>
            </li>
            <li>
              <button className="w-full flex items-center gap-3 text-left font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg bg-white/60 dark:bg-gray-800/60 text-blue-700 dark:text-blue-200 hover:bg-blue-100 dark:hover:bg-blue-900/60 hover:scale-[1.03]" onClick={() => setShowSettings(true)}> <FaUserCog className="text-2xl" /> Settings </button>
            </li>
          </ul>
        </nav>
        <button className="w-full mt-10 flex items-center gap-3 text-left font-semibold px-5 py-3 rounded-2xl transition-all shadow-lg bg-gradient-to-r from-red-500 to-red-700 text-white hover:from-red-600 hover:to-red-800 hover:scale-[1.03]" onClick={handleLogout}> <FaSignOutAlt className="text-2xl" /> Logout </button>
        <div className="mt-auto text-xs text-gray-400 text-center pt-10">&copy; 2024 DRM</div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col p-8 min-w-0">
        {/* Top bar with theme switcher and welcome */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-bold text-gray-700 dark:text-gray-200">Welcome, <span className="text-blue-600 dark:text-blue-400">{profile.fullName || 'Doctor'}</span></div>
          <ThemeSwitcher />
          </div>
        {/* Tabs at the top */}
        <div className="flex gap-4 mb-8">
          <button onClick={() => setTab('patients')} className={`px-8 py-3 rounded-t-2xl font-semibold border-b-4 transition-all duration-200 shadow ${tab === 'patients' ? 'border-blue-600 text-blue-600 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 bg-gray-200 dark:bg-gray-800 hover:bg-white/80 dark:hover:bg-gray-700'}`}>Patients</button>
          <button onClick={() => setTab('analytics')} className={`px-8 py-3 rounded-t-2xl font-semibold border-b-4 transition-all duration-200 shadow ${tab === 'analytics' ? 'border-blue-600 text-blue-600 bg-white dark:bg-gray-900' : 'border-transparent text-gray-500 bg-gray-200 dark:bg-gray-800 hover:bg-white/80 dark:hover:bg-gray-700'}`}>Analytics</button>
        </div>
        {/* Tab content */}
        {tab === 'patients' && (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div>
                <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow mb-1">Patients</h1>
                <p className="text-gray-500 dark:text-gray-300">Manage your patients below.</p>
              </div>
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition shadow"
              />
            </div>
            <div className="flex justify-end mb-4 gap-3">
              <button className="bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-green-600 hover:to-blue-600 transition-all" onClick={handleDownloadCSV}><span className="mr-2">⬇️</span>Download CSV</button>
              {showAllFields ? (
                <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all" onClick={() => setShowAllFields(false)}>Back</button>
              ) : (
                <button className="bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold px-6 py-2 rounded-xl shadow-lg hover:from-gray-800 hover:to-gray-900 transition-all" onClick={() => setShowAllFields(true)}>Show All Fields</button>
              )}
            </div>
            <div className="bg-white/40 dark:bg-gray-900/60 rounded-3xl shadow-2xl p-4 w-full border border-white/30 dark:border-gray-700/60 backdrop-blur-[4px]">
              <div className="overflow-x-auto w-full" style={{ minHeight: '400px', maxHeight: '600px', overflowY: 'auto' }}>
                {loading ? (
                  <div className="text-center text-blue-600 dark:text-blue-300 py-8 text-lg font-semibold animate-pulse">Loading patients...</div>
                ) : (
                  <table className="min-w-[1200px] w-full text-base text-gray-800 dark:text-gray-200">
                    <thead className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 text-white">
                      <tr>
                        {fieldsToShow.map((field) => (
                          <th key={field.key} className="px-5 py-3 text-left whitespace-nowrap font-bold tracking-wide">{field.label}</th>
                        ))}
                        <th className="px-5 py-3 text-left whitespace-nowrap font-bold tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
                      {patients.map((patient, idx) => (
                        <tr key={patient._id || idx} className="border-b border-gray-300 dark:border-gray-800 hover:bg-blue-50 dark:hover:bg-gray-800/60 transition-all">
                          {fieldsToShow.map((field) => (
                            <td key={field.key} className="px-5 py-3 whitespace-nowrap">
                              {field.key === 'number'
                                ? idx + 1
                                : field.key === 'dateofVisit' && patient[field.key]
                                  ? new Date(patient[field.key]).toLocaleDateString()
                                  : patient[field.key]}
                            </td>
                          ))}
                          <td className="px-5 py-3 flex flex-wrap gap-2 items-center">
                            <button className="flex items-center gap-1 bg-blue-500/90 text-black px-3 py-1 rounded-lg hover:bg-blue-600/90 shadow transition-all" onClick={() => openEditModal(patient)}><span className="text-lg">✏️</span>Edit</button>
                            <button className="flex items-center gap-1 bg-red-500/90 text-black px-3 py-1 rounded-lg hover:bg-red-600/90 shadow transition-all" onClick={() => handleDelete(patient._id)}><span className="text-lg">🗑️</span>Delete</button>
                            <button className="flex items-center gap-1 bg-yellow-500/90 text-black px-3 py-1 rounded-lg hover:bg-yellow-600/90 shadow transition-all" onClick={() => { setBillPatient(patient); setBillFields(['', '', '', '']); setIncludeTreatment(!!treatmentChecked[patient._id]); }}><span className="text-lg">🧾</span>Bill</button>
                            <label className="flex items-center text-gray-700 dark:text-gray-200 text-base ml-2 select-none cursor-pointer">
                              <input type="checkbox" checked={!!treatmentChecked[patient._id]} onChange={e => setTreatmentChecked(tc => ({ ...tc, [patient._id]: e.target.checked }))} className="mr-2 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-150" />
                              {treatmentChecked[patient._id] ? <span className="font-bold text-green-600">Treated</span> : 'Treatment'}
                            </label>
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
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-0 w-full max-w-xl relative max-h-[95vh] overflow-auto border border-white/30 dark:border-gray-700/60 backdrop-blur-[8px]">
                  <button className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10" onClick={() => setShowModal(false)}>&times;</button>
                  <AddPatient onClose={() => setShowModal(false)} onAddPatient={handleAddPatient} />
                </div>
              </div>
            )}
            {/* Settings Modal */}
            {showSettings && (
              <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
                <div className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 w-full max-w-lg relative border border-white/30 dark:border-gray-700/60 backdrop-blur-[8px]">
                  <button className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10" onClick={() => setShowSettings(false)}>&times;</button>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Edit Profile</h2>
                  <form className="space-y-5" onSubmit={e => { e.preventDefault(); handleProfileSave(); }}>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Full Name</label>
                      <input type="text" name="fullName" value={profile.fullName} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Email</label>
                      <input type="email" name="email" value={profile.email} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                    </div>
                    <div>
                      <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Medical Field</label>
                      <input type="text" name="medicalField" value={profile.medicalField} onChange={handleProfileChange} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition-all" onClick={() => setShowSettings(false)}>Cancel</button>
                      <button type="submit" className="px-8 py-2 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Edit Patient Modal */}
            {editPatient && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
                <div className="bg-white/90 dark:bg-gray-900/90 p-8 rounded-3xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-white/30 dark:border-gray-700/60 backdrop-blur-[8px]">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Edit Patient</h2>
                  <form onSubmit={e => { e.preventDefault(); handleEditSave(); }} className="space-y-4">
                    {Object.keys(editForm).map((key) => (
                      key !== '_id' && key !== 'doctor' && key !== '__v' && key !== 'number' && (
                        <div key={key} className="mb-3">
                          <label className="block text-gray-700 dark:text-gray-200 mb-1 capitalize">{key.replace(/_/g, ' ')}</label>
                          <input type="text" name={key} value={editForm[key] || ''} onChange={handleEditChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
                        </div>
                      )
                    ))}
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="button" className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition-all" onClick={closeEditModal}>Cancel</button>
                      <button type="submit" className="px-8 py-2 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Bill Modal */}
            {billPatient && (
              <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 animate-fade-in">
                <div className="bg-white/80 dark:bg-gray-900/95 p-8 rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto border border-white/30 dark:border-gray-700/60 backdrop-blur-[10px] relative">
                  <button className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-3xl font-bold z-10" onClick={() => setBillPatient(null)}>&times;</button>
                  <div className="flex flex-col items-center mb-4">
                    <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-full mb-2 shadow">
                      <span className="text-3xl">🧾</span>
                    </div>
                    <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow mb-1">Ashish Homeo Clinic</h2>
                    <div className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white">Patient: {billPatient.Name}</div>
                  </div>
                  <form onSubmit={e => { e.preventDefault(); handleDownloadBillPDF(); }} className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full text-base text-gray-800 dark:text-gray-200 rounded-xl overflow-hidden">
                        <thead>
                          <tr className="bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 text-white">
                            <th className="px-4 py-2 text-left">Description</th>
                            <th className="px-4 py-2 text-right">Amount (₹)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billFieldLabels.map((label, idx) => (
                            <tr key={idx} className="hover:bg-blue-50 dark:hover:bg-gray-800/60 transition-all">
                              <td className="px-4 py-2">{label}</td>
                              <td className="px-4 py-2 text-right">
                                <input type="number" min="0" step="0.01" value={billFields[idx]} onChange={e => setBillFields(fields => fields.map((f, i) => (i === idx ? e.target.value : f)))} placeholder={label} className="w-24 px-2 py-1 rounded-lg border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition text-right" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td className="px-4 py-2 font-bold text-blue-700 dark:text-blue-300 text-right">Total</td>
                            <td className="px-4 py-2 font-bold text-lg bg-gradient-to-r from-blue-100 via-emerald-100 to-indigo-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-blue-900 dark:text-emerald-300 text-right rounded-b-xl">₹{billFields.reduce((sum, val) => sum + (parseFloat(val) || 0), 0).toFixed(2)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                    <hr className="my-4 border-blue-200 dark:border-gray-700" />
                    <div className="flex justify-end gap-2 mt-4">
                      <button type="submit" className="px-8 py-2 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700">Download Bill</button>
                      <button type="button" className="px-6 py-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-xl font-semibold shadow hover:bg-gray-400 dark:hover:bg-gray-600 transition-all" onClick={() => setBillPatient(null)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
            )}
          </>
        )}
        {tab === 'analytics' && (
          <>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow mb-2">Analytics & Insights</h1>
            <p className="text-gray-500 dark:text-gray-300 mb-8">Visualize your patient data and trends.</p>
            {/* Stat cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/30 dark:border-gray-700/60">
                <div className="text-5xl font-extrabold text-blue-600 dark:text-blue-400 mb-2 animate-fade-in">{totalPatients}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Total Patients</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/30 dark:border-gray-700/60">
                <div className="text-5xl font-extrabold text-green-600 dark:text-green-400 mb-2 animate-fade-in delay-100">{newPatientsThisMonth}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold text-lg">New This Month</div>
              </div>
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-white/30 dark:border-gray-700/60">
                <div className="text-5xl font-extrabold text-purple-600 dark:text-purple-400 mb-2 animate-fade-in delay-200">{Object.keys(diagCounts).length}</div>
                <div className="text-gray-700 dark:text-gray-200 font-semibold text-lg">Unique Diagnoses</div>
              </div>
            </div>
            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 border border-white/30 dark:border-gray-700/60">
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
              <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 border border-white/30 dark:border-gray-700/60">
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
            <div className="bg-white/60 dark:bg-gray-800/60 rounded-2xl shadow-xl p-8 mt-10 border border-white/30 dark:border-gray-700/60">
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
