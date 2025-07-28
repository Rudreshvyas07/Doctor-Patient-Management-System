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
      setMessage("Server error")
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#01111f] overflow-hidden">
    {/* Animated Background Effects */}
    <div className="absolute inset-0 z-0 overflow-hidden">
      <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#0dc5b8]/30 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-[-80px] right-[-80px] w-60 h-60 bg-[#f4b43e]/30 rounded-full blur-2xl animate-blob-slow" />
      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#0dc5b8]/20 rounded-full blur-xl animate-ping" />
    </div>
      <div className=" dark:bg-[#18223a] shadow-2xl rounded-3xl p-24 md:p-16 max-w-5xl w-full flex flex-col justify-center border border-[#e0e7ef] dark:border-[#232e4a]">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold mb-2 text-[#2563eb] dark:text-[#38bdf8] drop-shadow animate-fade-in">Sign up</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in delay-100">Create your account to get started!</p>
        </div>
         {/* Background Blobs */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300/20 dark:bg-sky-700/30 rounded-full blur-3xl animate-blob-1" />
        <div className="absolute bottom-10 right-10 w-56 h-56 bg-teal-300/20 dark:bg-teal-600/30 rounded-full blur-2xl animate-blob-2" />
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-cyan-300/30 dark:bg-cyan-500/20 rounded-full blur-xl animate-blob-3" />
      </div>
        <form className="space-y-6 animate-fade-in delay-200" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">Full Name</label>
              <span className="absolute left-3 top-9 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/></svg>
              </span>
              <input
                type="text"
                name="fullName"
                placeholder="Jon Snow"
                value={form.fullName}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">Medical Field</label>
              <span className="absolute left-3 top-9 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0v12h8V4H6zm2 2h4v2H8V6zm0 4h4v2H8v-2z"/></svg>
              </span>
              <input
                type="text"
                name="medicalField"
                placeholder="Medical Field"
                value={form.medicalField}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">Email</label>
              <span className="absolute left-3 top-9 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 5.12A2 2 0 014.88 4h10.24a2 2 0 011.94 1.12l-7.06 4.42-7.06-4.42zM18 6.08v8.16A2 2 0 0116 16.24H4a2 2 0 01-2-2V6.08l7.47 4.68a1 1 0 001.06 0L18 6.08z"/></svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">Password</label>
              <span className="absolute left-3 top-9 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/></svg>
              </span>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white transition"
              />
            </div>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">Mobile Number</label>
              <span className="absolute left-3 top-9 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 00-1 1v12a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1H2zm0 2h16v10H2V5zm2 2v2h2V7H4zm0 4v2h2v-2H4zm4-4v2h2V7H8zm0 4v2h2v-2H8zm4-4v2h2V7h-2zm0 4v2h2v-2h-2z"/></svg>
              </span>
              <input
                type="tel"
                name="mobile"
                placeholder="+91-9876543210"
                value={form.mobile}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white transition"
              />
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 accent-[#2563eb]" id="updates" />
              <label htmlFor="updates" className="text-sm text-[#64748b] dark:text-[#cbd5e1] select-none">I want to receive updates via email.</label>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-[#2563eb]  text-white hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#6ee7b7] dark:focus:ring-[#38bdf8] animate-fade-in delay-300"
              aria-label="Sign up"
            >
              Sign up
            </button>
            {message && <div className="text-center text-sm mt-2 text-[#10b981] dark:text-[#6ee7b7]">{message}</div>}
          </form>
          <div className="text-center mt-6 animate-fade-in delay-400">
            <p className="text-sm text-[#64748b] dark:text-[#cbd5e1]">
              Already have an account?{' '}
              <Link to="/login" className="text-[#2563eb] dark:text-[#38bdf8] hover:underline font-medium">
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

      @keyframes blobSlow {
        0%, 100% { transform: translate(0px, 0px) scale(1); }
        50% { transform: translate(30px, -20px) scale(1.1); }
      }

      @keyframes pulseSlow {
        0%, 100% { transform: scale(1); opacity: 0.3; }
        50% { transform: scale(1.05); opacity: 0.5; }
      }

      .animate-blob-slow {
        animation: blobSlow 10s infinite;
      }

      .animate-pulse-slow {
        animation: pulseSlow 8s infinite;
      }
        
    `}</style>
    </div>
  );
}

export default Signup;
