import { FaTachometerAlt, FaUserPlus } from 'react-icons/fa';
import ThemeSwitcher from './ThemeSwitcher';
import AddPatient from './addpatient';
import React, { useState } from 'react';

function Dashboard() {
  const [showAddPatient, setShowAddPatient] = useState(false);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans relative">
      <div className="absolute top-0 right-0 p-6 z-20"><ThemeSwitcher /></div>
      {/* Quick Stats Card */}
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-md">
        <div className="bg-gradient-to-r from-blue-200 via-emerald-100 to-indigo-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 rounded-2xl shadow-lg p-6 flex items-center gap-4 border border-white/30 dark:border-gray-700/60">
          <FaTachometerAlt className="w-8 h-8 text-blue-500 dark:text-blue-300" />
          <div>
            <div className="text-lg font-bold text-gray-800 dark:text-gray-200">Quick Stats</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Patients managed efficiently</div>
          </div>
        </div>
      </div>
      <div className="bg-white/30 dark:bg-gray-900/70 shadow-2xl rounded-3xl p-10 max-w-2xl w-full flex flex-col items-center border border-white/30 dark:border-gray-700/60 backdrop-blur-[6px] animate-fade-in">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-full mb-2">
            <FaTachometerAlt className="w-10 h-10 text-blue-600 dark:text-blue-300" />
          </div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow mb-2 animate-fade-in">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 animate-fade-in delay-100">Welcome to your dashboard! Use the quick actions below.</p>
        </div>
        <button
          className="mb-4 px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700 flex items-center gap-2"
          onClick={() => setShowAddPatient((prev) => !prev)}
          aria-label="Add Patient"
        >
          <FaUserPlus className="text-xl" /> {showAddPatient ? 'Close Add Patient' : 'Add Patient'}
        </button>
        {showAddPatient && <div className="w-full mt-4"><AddPatient onClose={() => setShowAddPatient(false)} /></div>}
      </div>
      <style>{`
        .animate-fade-in { opacity: 0; animation: fadeIn 1s forwards; }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default Dashboard;