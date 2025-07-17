import { useState } from "react";
import { Link } from "react-router-dom";

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
      const res = await fetch("http://localhost:5000/api/auth/signup", {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-12 max-w-2xl w-full min-h-[650px] flex flex-col justify-center border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-4 rounded-full mb-2">
            <img src="/images/log.png" alt="User Icon" className="w-12 h-12 object-contain" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">Sign up</h2>
          <p className="text-gray-500 mt-1">Create your account to get started!</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Jon Snow"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Medical Field</label>
            <input
              type="text"
              name="medicalField"
              placeholder="Medical Field"
              value={form.medicalField}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Mobile Number</label>
            <input
              type="tel"
              name="mobile"
              placeholder="+91-9876543210"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 accent-blue-600" id="updates" />
            <label htmlFor="updates" className="text-sm text-gray-600 select-none">I want to receive updates via email.</label>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition text-lg tracking-wide"
          >
            Sign up
          </button>
          {message && <div className="text-center text-sm mt-2 text-blue-600">{message}</div>}
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
