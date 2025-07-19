import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';
import API_BASE_URL from '../config/api';

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    medicalField: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please login.");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="w-full flex justify-end px-8 pt-6"><ThemeSwitcher /></div>
      <div className="bg-white/30 dark:bg-gray-900/70 shadow-2xl rounded-3xl p-12 max-w-xl w-full min-h-[650px] flex flex-col justify-center border border-white/30 dark:border-gray-700/60 backdrop-blur-[6px]">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow animate-fade-in">Sign up</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in delay-100">Create your account to get started!</p>
        </div>
        <form className="space-y-6 animate-fade-in delay-200" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Full Name</label>
              <span className="absolute left-3 top-9 text-blue-400 dark:text-blue-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/></svg>
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Jon Snow"
                value={form.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Medical Field</label>
              <span className="absolute left-3 top-9 text-blue-400 dark:text-blue-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm2 2h4v2H8V6zm0 4h4v2H8v-2z"/></svg>
              </span>
              <input
                type="text"
                name="medicalField"
                placeholder="Medical Field"
                value={form.medicalField}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Email</label>
              <span className="absolute left-3 top-9 text-blue-400 dark:text-blue-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 5.12A2 2 0 014.88 4h10.24a2 2 0 011.94 1.12l-7.06 4.42-7.06-4.42zM18 6.08v8.16A2 2 0 0116 16.24H4a2 2 0 01-2-2V6.08l7.47 4.68a1 1 0 001.06 0L18 6.08z"/></svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Password</label>
              <span className="absolute left-3 top-9 text-blue-400 dark:text-blue-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/></svg>
              </span>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-gray-700 dark:text-gray-200 text-sm mb-1 font-medium">Mobile Number</label>
              <span className="absolute left-3 top-9 text-blue-400 dark:text-blue-300">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 2h16v10H2V5zm2 2v2h2V7H4zm0 4v2h2v-2H4zm4-4v2h2V7H8zm0 4v2h2v-2H8zm4-4v2h2V7h-2zm0 4v2h2v-2h-2z"/></svg>
              </span>
              <input
                type="tel"
                name="mobile"
                placeholder="+91-9876543210"
                value={form.mobile}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 dark:text-white transition"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-600" id="updates" />
              <label htmlFor="updates" className="text-sm text-gray-600 dark:text-gray-300 select-none">I want to receive updates via email.</label>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700 animate-fade-in delay-300"
              aria-label="Sign up"
            >
              Sign up
            </button>
            {message && <div className="text-center text-sm mt-2 text-blue-600 dark:text-blue-400">{message}</div>}
          </form>
          <div className="text-center mt-6 animate-fade-in delay-400">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                Login
              </Link>
            </p>
          </div>
        </div>
      {/* Animations */}
      <style>{`
        .animate-fade-in {
          opacity: 0;
          animation: fadeIn 1s forwards;
        }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in.delay-300 { animation-delay: 0.3s; }
        .animate-fade-in.delay-400 { animation-delay: 0.4s; }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
  
}


export default Signup;
