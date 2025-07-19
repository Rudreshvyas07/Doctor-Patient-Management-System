import { FaUserMd } from 'react-icons/fa';

function PatientForm() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="bg-white/30 dark:bg-gray-900/70 shadow-2xl rounded-3xl p-10 max-w-xl w-full flex flex-col items-center border border-white/30 dark:border-gray-700/60 backdrop-blur-[6px] animate-fade-in">
        {/* Progress Bar */}
        <div className="w-full mb-4">
          <div className="h-2 rounded-full bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 animate-pulse" style={{ width: '60%' }}></div>
        </div>
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 dark:bg-gray-800 p-4 rounded-full mb-2">
            <FaUserMd className="w-10 h-10 text-blue-600 dark:text-blue-300" />
            <svg className="w-8 h-8 text-emerald-500 mt-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow mb-2 animate-fade-in">Patient Form</h1>
          <p className="text-gray-600 dark:text-gray-300 animate-fade-in delay-100">Fill in the patient details below.</p>
        </div>
        {/* Example form fields, replace with real ones as needed */}
        <form className="w-full space-y-4 animate-fade-in delay-200">
          <input type="text" placeholder="Patient Name" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
          <input type="number" placeholder="Age" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
          <input type="text" placeholder="Diagnosis" className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition" />
          <button type="submit" className="w-full px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700">Submit</button>
        </form>
      </div>
      <style>{`
        .animate-fade-in { opacity: 0; animation: fadeIn 1s forwards; }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        @keyframes fadeIn { to { opacity: 1; } }
      `}</style>
    </div>
  );
}

export default PatientForm;
