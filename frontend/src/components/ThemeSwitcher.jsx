// ThemeSwitcher.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeContext';

const options = [
  {
    value: 'system',
    label: 'System',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M9.75 3h4.5v1.5h-4.5V3zM3 9.75h1.5v4.5H3v-4.5zm16.5 0H21v4.5h-1.5v-4.5zM9.75 19.5h4.5V21h-4.5v-1.5zM6.75 6.75l3 3m4.5-3l3 3m-10.5 7.5l3-3m4.5 3l3-3" />
      </svg>
    ),
  },
  {
    value: 'light',
    label: 'Light',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M12 3v1.5m6.364 1.636l-1.061 1.061M21 12h-1.5m-1.636 6.364l-1.061-1.061M12 21v-1.5m-6.364-1.636l1.061-1.061M3 12h1.5m1.636-6.364l1.061 1.061M12 8.25a3.75 3.75 0 1 1 0 7.5a3.75 3.75 0 0 1 0-7.5z" />
      </svg>
    ),
  },
  {
    value: 'dark',
    label: 'Dark',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M21 12.79A9 9 0 0 1 11.21 3a7 7 0 1 0 9.79 9.79z" />
      </svg>
    ),
  },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = options.find(opt => opt.value === theme);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        className="border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none p-2 rounded"
        onClick={() => setOpen(prev => !prev)}
        title="Change theme"
      >
        {current?.icon}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`flex items-center gap-2 text-left px-4 py-2 text-sm transition-colors
                ${theme === opt.value ? 'bg-gray-100 dark:bg-gray-700 font-semibold' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              onClick={() => handleThemeChange(opt.value)}
            >
              
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
