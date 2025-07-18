import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const options = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function getIcon(theme) {
  if (theme === 'dark') return '🌙';
  if (theme === 'light') return '☀️';
  return '🖥️';
}

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        className="p-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        title="Change theme"
      >
        <span className="text-xl">{getIcon(theme)}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`block w-full text-left px-4 py-2 text-sm rounded transition-colors ${theme === opt.value ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => { setTheme(opt.value); setOpen(false); }}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 