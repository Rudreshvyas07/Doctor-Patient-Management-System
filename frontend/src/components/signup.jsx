import { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from '../config/api';

console.log("🟢 Signup component rendered");

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    medicalField: "",
    email: "",
    password: "",
    mobile: "",
    code: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "code" && value.length > 4) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("🚀 Submit clicked, data:", form);

    if (form.code.length !== 4 || isNaN(form.code)) {
      setMessage("Code must be a 4-digit number");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.user && data.user.code) {
          localStorage.setItem("doctorCode", data.user.code);
          localStorage.setItem("doctorId", data.user._id);
        }

        setMessage("Signup successful! Please login.");
        setForm({
          fullName: "",
          medicalField: "",
          email: "",
          password: "",
          mobile: "",
          code: ""
        });
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage("Server error");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#01111f] overflow-hidden">
      
      {/* Background blobs (non-clickable) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#0dc5b8]/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-80px] right-[-80px] w-60 h-60 bg-[#f4b43e]/30 rounded-full blur-2xl animate-blob-slow" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#0dc5b8]/20 rounded-full blur-xl animate-ping" />
      </div>

      {/* Signup Form Container */}
      <div className="z-10 dark:bg-[#18223a] shadow-2xl rounded-3xl p-24 md:p-16 max-w-5xl w-full flex flex-col justify-center border border-[#e0e7ef] dark:border-[#232e4a]">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold mb-2 text-[#2563eb] dark:text-[#38bdf8] drop-shadow animate-fade-in">
            Sign up
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in delay-100">
            Create your account to get started!
          </p>
        </div>

        <form
          className="space-y-6 animate-fade-in delay-200"
          onSubmit={(e) => {
            e.preventDefault();
            console.log("🚨 onSubmit triggered!");
            handleSubmit(e);
          }}
        >

          {/* Full Name */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Jon Snow"
              value={form.fullName}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Medical Field */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              Medical Field
            </label>
            <input
              type="text"
              name="medicalField"
              placeholder="Homeopathy"
              value={form.medicalField}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Mobile */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="+91-9876543210"
              value={form.mobile}
              onChange={handleChange}
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Doctor Code */}
          <div className="relative">
            <label className="block text-[#334155] dark:text-[#cbd5e1] text-sm mb-1 font-medium">
              4-Digit Doctor Code
            </label>
            <input
              type="number"
              name="code"
              placeholder="1234"
              value={form.code}
              onChange={handleChange}
              min="1000"
              max="9999"
              className="w-full pl-3 pr-4 py-2 border rounded-lg dark:bg-[#101624] dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full px-8 py-3 rounded-xl font-bold text-lg shadow-md bg-[#2563eb] text-white hover:scale-105 transition-all"
          >
            Sign up
          </button>

          {message && (
            <div className="text-center text-sm mt-2 text-[#10b981] dark:text-[#6ee7b7]">
              {message}
            </div>
          )}
        </form>

        <div className="text-center mt-6 animate-fade-in delay-400">
          <p className="text-sm text-[#64748b] dark:text-[#cbd5e1]">
            Already have an account?{" "}
            <Link to="/login" className="text-[#2563eb] dark:text-[#38bdf8] hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
