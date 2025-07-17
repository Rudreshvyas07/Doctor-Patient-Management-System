import React, { useState } from 'react';
import AddPatient from './addpatient';

function Dashboard() {
  const [showAddPatient, setShowAddPatient] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={() => setShowAddPatient((prev) => !prev)}
      >
        {showAddPatient ? 'Close Add Patient' : 'Add Patient'}
      </button>
      {showAddPatient && <AddPatient onClose={() => setShowAddPatient(false)} />}
    </div>
  );
}

export default Dashboard; 