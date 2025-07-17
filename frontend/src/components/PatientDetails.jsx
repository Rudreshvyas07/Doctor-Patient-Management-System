import React, { useState } from 'react';

const PatientDetails = ({ patient, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!patient) return null;

  // Filter fields by search term
  const filteredEntries = Object.entries(patient).filter(
    ([key, value]) =>
      key !== '_id' &&
      key !== '__v' &&
      key !== 'doctor' &&
      key !== 'number' &&
      (key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())))
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg max-h-[80vh] overflow-y-auto print:max-h-none print:overflow-visible">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Patient Details</h2>
          {onClose && (
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">&times;</button>
          )}
        </div>
        <input
          type="text"
          placeholder="Search details..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400"
        />
        <table className="w-full text-sm mb-4">
          <tbody>
            {filteredEntries.map(([key, value]) => (
              <tr key={key}>
                <td className="font-semibold capitalize pr-2 py-1 text-gray-700 dark:text-gray-200">{key.replace(/_/g, ' ')}</td>
                <td className="py-1 text-gray-900 dark:text-white">{key === 'dateofVisit' ? new Date(value).toLocaleDateString() : value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-end gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white print:hidden"
            onClick={() => window.print()}
          >
            Download Bill
          </button>
          {onClose && (
            <button type="button" className="px-4 py-2 rounded bg-gray-400 text-black print:hidden" onClick={onClose}>Close</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDetails; 