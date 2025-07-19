import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from './ThemeSwitcher';

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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 font-sans">
      <div className="w-full flex justify-end px-8 pt-6"><ThemeSwitcher /></div>
      <div className="bg-white/30 dark:bg-gray-900/70 shadow-2xl rounded-3xl p-12 max-w-xl w-full min-h-[600px] flex flex-col justify-center border border-white/30 dark:border-gray-700/60 backdrop-blur-[6px]">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-emerald-500 drop-shadow animate-fade-in">Login</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1 animate-fade-in delay-100">Welcome back! Please login to your account.</p>
        </div>
        <form className="space-y-6 animate-fade-in delay-200" onSubmit={handleSubmit}>
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
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="text-xs text-blue-500 hover:underline">Forgot password?</Link>
              </div>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-600" id="remember" />
              <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-300 select-none">Remember me</label>
            </div>
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl font-bold text-lg shadow-lg bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500 text-white hover:scale-105 hover:shadow-2xl hover:from-blue-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-emerald-700 animate-fade-in delay-300"
              aria-label="Login"
            >
              Login
            </button>
            {message && <div className="text-center text-sm mt-2 text-blue-600 dark:text-blue-400">{message}</div>}
          </form>
        <div className="text-center mt-6 animate-fade-in delay-400">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
              Sign up
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

export default Login;
