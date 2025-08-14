import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

function Login() {
  const [form, setForm] = useState({ email: "", password: "", code: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "code" && value.length > 4) return;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.code.length !== 4 || isNaN(form.code)) {
      setMessage("Doctor code must be a 4-digit number.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        if (data.user && data.user._id) {
          localStorage.setItem("doctorId", data.user._id);
          localStorage.setItem("doctorCode", data.user.code);
        }
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setMessage("Server error: " + (err.message || err));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#3B82F6]/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-80px] right-[-80px] w-60 h-60 bg-[#1E3A8A]/20 rounded-full blur-2xl animate-blob-slow" />
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-extrabold text-[#1E3A8A] animate-fade-in">Login</h2>
          <p className="text-gray-600 mt-2 animate-fade-in delay-100">
            Welcome back! Please login to your account.
          </p>
        </div>

        <form className="space-y-6 animate-fade-in delay-200" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition"
            />
            <div className="text-right mt-1">
              <Link to="/forgot-password" className="text-sm text-[#3B82F6] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Doctor Code */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">4-Digit Doctor Code</label>
            <input
              type="number"
              name="code"
              placeholder="e.g. 1234"
              value={form.code}
              onChange={handleChange}
              min="1000"
              max="9999"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] transition"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input type="checkbox" className="mr-2 accent-[#3B82F6]" id="remember" />
            <label htmlFor="remember" className="text-gray-700 select-none">Remember me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 rounded-full font-bold text-lg shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white transition-all duration-200"
          >
            Login
          </button>

          {message && <p className="text-center text-[#1E3A8A] mt-2">{message}</p>}
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-700">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#3B82F6] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        .animate-fade-in { opacity: 0; animation: fadeIn 0.8s forwards; }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes blobSlow {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(30px, -20px) scale(1.1); }
        }
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }
        .animate-blob-slow { animation: blobSlow 10s infinite; }
        .animate-pulse-slow { animation: pulseSlow 8s infinite; }
      `}</style>
    </div>
  );
}

export default Login;
