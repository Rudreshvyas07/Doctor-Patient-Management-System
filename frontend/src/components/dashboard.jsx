// DoctorDashboardWhite.jsx
import React from 'react';
import { FaUsers, FaCalendarCheck, FaUserPlus, FaCog } from 'react-icons/fa';

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen flex bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 border-r border-gray-200 hidden md:block">
        <h2 className="text-2xl font-bold mb-8">Doctor Panel</h2>
        <nav className="space-y-4 text-gray-700">
          <div className="flex items-center gap-2 font-medium hover:text-blue-600 cursor-pointer"><FaUsers /> Patients</div>
          <div className="flex items-center gap-2 font-medium hover:text-blue-600 cursor-pointer"><FaCalendarCheck /> Analytics</div>
          <div className="flex items-center gap-2 font-medium hover:text-blue-600 cursor-pointer"><FaUserPlus /> Add Patient</div>
          <div className="flex items-center gap-2 font-medium hover:text-blue-600 cursor-pointer"><FaCog /> Settings</div>
        </nav>
        <button className="mt-10 w-full bg-red-100 text-red-600 py-2 rounded-lg font-semibold hover:bg-red-200 transition">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-4">Welcome, Doctor</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700">Patients</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">Analytics</button>
        </div>

        {/* Search and Actions */}
        <div className="flex justify-between items-center mb-4">
          <input type="text" placeholder="Search by name..." className="px-4 py-2 border rounded-lg w-1/3" />
          <div className="flex gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Download CSV</button>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200">Show All Fields</button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">No.</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Age</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Phone</th>
                <th className="px-6 py-3 text-left text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">Raunit Makhija</td>
                <td className="px-6 py-4">12</td>
                <td className="px-6 py-4">Male</td>
                <td className="px-6 py-4">9890288529</td>
                <td className="px-6 py-4 flex flex-wrap gap-2">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                  <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">Bill</button>
                  <label className="inline-flex items-center text-sm">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">Treatment</span>
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;