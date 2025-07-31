import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';
import nurseImage from '../assets/nurse.png'; 

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
        localStorage.setItem("doctorCode", data.user.code); // ✅ Save doctorCode
      }
      setMessage("Login successful!");
      setTimeout(() => navigate("/dashboard"), 1000);
    } else {
      setMessage(data.message || "Login failed");
    }
  } catch (err) {
    console.error('Error logging in:', err);
    setMessage('Server error: ' + (err.message || err));
  }
};

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-[#01111f] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-100px] left-[-100px] w-72 h-72 bg-[#0dc5b8]/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-[-80px] right-[-80px] w-60 h-60 bg-[#f4b43e]/30 rounded-full blur-2xl animate-blob-slow" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#0dc5b8]/20 rounded-full blur-xl animate-ping" />
      </div>

      {/* Login Layout */}
      <div className="relative z-10 flex w-full max-w-6xl h-[600px]">
        {/* Left Image */}
        <div className="w-1/2 h-full">
          <img src={nurseImage} alt="Nurse" className="w-full h-full object-cover" />
        </div>

        {/* Right Form Box */}
        <div className="w-1/2 bg-white dark:bg-[#0e1c26] rounded-3xl shadow-2xl border border-[#e0e7ef] dark:border-[#1c2b36] flex justify-center items-center p-8 md:p-16">
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
              <h2 className="text-5xl font-extrabold mb-2 text-[#f4b43e] drop-shadow animate-fade-in">Login</h2>
              <p className="text-lg text-[#cbd5e1] animate-fade-in delay-100">Welcome back! Please login to your account.</p>
            </div>

            <form className="space-y-8 animate-fade-in delay-200" onSubmit={handleSubmit}>
              {/* Email */}
              <div className="relative">
                <label className="block text-[#ffffff] text-base mb-1 font-medium">Email</label>
                <span className="absolute left-3 top-11 text-[#0dc5b8]">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.94 5.12A2 2 0 014.88 4h10.24a2 2 0 011.94 1.12l-7.06 4.42-7.06-4.42zM18 6.08v8.16A2 2 0 0116 16.24H4a2 2 0 01-2-2V6.08l7.47 4.68a1 1 0 001.06 0L18 6.08z"/>
                  </svg>
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0dc5b8] dark:bg-[#0a1821] text-lg transition"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <label className="block text-[#cbd5e1] text-base mb-1 font-medium">Password</label>
                <span className="absolute left-3 top-10 text-[#0dc5b8]">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/>
                  </svg>
                </span>
                <input
                  type="password"
                  name="password"
                  placeholder="********"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0dc5b8] dark:bg-[#0a1821] dark:text-white text-lg transition"
                />
                <div className="text-right mt-1">
                  <Link to="/forgot-password" className="text-sm text-[#ffffff] hover:underline">Forgot password?</Link>
                </div>
              </div>

              {/* Doctor Code */}
              <div className="relative">
                <label className="block text-[#cbd5e1] text-base mb-1 font-medium">4-Digit Doctor Code</label>
                <span className="absolute left-3 top-10 text-[#0dc5b8]">
                  <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 4a1 1 0 000 2h10a1 1 0 100-2H5zM4 8a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zm1 3a1 1 0 000 2h10a1 1 0 100-2H5z" />
                  </svg>
                </span>
                <input
                  type="number"
                  name="code"
                  placeholder="e.g. 1234"
                  value={form.code}
                  onChange={handleChange}
                  min="1000"
                  max="9999"
                  className="w-full pl-12 pr-4 py-3 border border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0dc5b8] dark:bg-[#0a1821] dark:text-white text-lg transition"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input type="checkbox" className="mr-2 accent-[#0dc5b8]" id="remember" />
                <label htmlFor="remember" className="text-base text-[#cbd5e1] select-none">Remember me</label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full px-8 py-3 rounded-full font-bold text-xl shadow-md bg-[#f4b43e] hover:bg-[#e0a532] text-[#ffffff] hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0dc5b8] animate-fade-in delay-300"
                aria-label="Login"
              >
                Login
              </button>

              {message && (
                <div className="text-center text-base mt-2 text-[#f4b43e]">
                  {message}
                </div>
              )}
            </form>

            <div className="text-center mt-8 animate-fade-in delay-400">
              <p className="text-base text-[#cbd5e1]">
                Don't have an account?{" "}
                <Link to="/signup" className="text-sm text-[#ffffff] hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        .animate-fade-in { opacity: 0; animation: fadeIn 1s forwards; }
        .animate-fade-in.delay-100 { animation-delay: 0.1s; }
        .animate-fade-in.delay-200 { animation-delay: 0.2s; }
        .animate-fade-in.delay-300 { animation-delay: 0.3s; }
        .animate-fade-in.delay-400 { animation-delay: 0.4s; }
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
