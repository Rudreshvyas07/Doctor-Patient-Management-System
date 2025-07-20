import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
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
        }
        setMessage("Login successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f8fb] font-sans transition-colors duration-500">
      <div className="bg-white dark:bg-[#18223a] shadow-2xl rounded-3xl p-24 max-w-4xl w-full flex flex-col justify-center border border-[#e0e7ef] dark:border-[#232e4a]">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-5xl font-extrabold mb-2 text-[#2563eb] dark:text-[#38bdf8] drop-shadow animate-fade-in">Login</h2>
          <p className="text-lg text-[#64748b] dark:text-[#cbd5e1] animate-fade-in delay-100">Welcome back! Please login to your account.</p>
        </div>
        <form className="space-y-8 animate-fade-in delay-200" onSubmit={handleSubmit}>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-base mb-1 font-medium">Email</label>
              <span className="absolute left-3 top-10 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path d="M2.94 5.12A2 2 0 014.88 4h10.24a2 2 0 011.94 1.12l-7.06 4.42-7.06-4.42zM18 6.08v8.16A2 2 0 0116 16.24H4a2 2 0 01-2-2V6.08l7.47 4.68a1 1 0 001.06 0L18 6.08z"/></svg>
              </span>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white text-lg transition"
              />
            </div>
            <div className="relative">
              <label className="block text-[#334155] dark:text-[#cbd5e1] text-base mb-1 font-medium">Password</label>
              <span className="absolute left-3 top-10 text-[#2563eb] dark:text-[#38bdf8]">
                <svg width="22" height="22" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zm-2 6V6a2 2 0 114 0v2H8zm-3 2h10v6H5v-6z"/></svg>
              </span>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3 border border-[#cbd5e1] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#38bdf8] dark:bg-[#101624] dark:text-white text-lg transition"
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-sm text-[#2563eb] dark:text-[#38bdf8] hover:underline">Forgot password?</Link>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 accent-[#2563eb]" id="remember" />
              <label htmlFor="remember" className="text-base text-[#64748b] dark:text-[#cbd5e1] select-none">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl font-bold text-xl shadow-md bg-[#2563eb] hover:bg-[#174ea6] text-black hover:scale-105 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#93c5fd] dark:focus:ring-[#38bdf8] animate-fade-in delay-300"
              aria-label="Login"
            >
              Login
            </button>
            {message && <div className="text-center text-base mt-2 text-[#2563eb] dark:text-[#38bdf8]">{message}</div>}
          </form>
        <div className="text-center mt-8 animate-fade-in delay-400">
          <p className="text-base text-[#64748b] dark:text-[#cbd5e1]">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#2563eb] dark:text-[#38bdf8] hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </div>
      </div>
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

export default Login;
