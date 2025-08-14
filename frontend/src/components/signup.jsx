import { useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from '../config/api';

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
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12 max-w-lg w-full border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-extrabold text-indigo-600">
            Sign up
          </h2>
          <p className="text-gray-500 mt-1">
            Create your account to get started!
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Jon Snow"
              value={form.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Medical Field */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Medical Field
            </label>
            <input
              type="text"
              name="medicalField"
              placeholder="Homeopathy"
              value={form.medicalField}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              name="mobile"
              placeholder="+91-9876543210"
              value={form.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Doctor Code */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold text-lg shadow-md bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
          >
            Sign up
          </button>

          {message && (
            <div className="text-center text-sm mt-2 text-green-600">
              {message}
            </div>
          )}
        </form>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
