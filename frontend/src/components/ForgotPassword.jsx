import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from '../config/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("If an account exists, a reset link has been sent.");
      } else {
        setMessage(data.message || "Failed to send reset link.");
      }
    } catch (err) {
      console.error("Error sending reset link:", err);
      setMessage("Server error: " + (err.message || err));
    } finally {
      setLoading(false);
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

      <div className="dark:bg-[#18223a] shadow-2xl rounded-3xl p-24 md:p-16 max-w-2xl w-full flex flex-col justify-center border border-[#e0e7ef] dark:border-[#232e4a] z-10">
        <h2 className="text-2xl font-extrabold text-white mb-2 text-center">Forgot Password</h2>
        <p className="text-gray-200 mb-6 text-center">Enter your email to receive a password reset link.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-200 text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-[#334155] rounded-lg bg-white dark:bg-[#101624] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition text-lg tracking-wide disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && (
            <div className="text-center text-sm mt-2 text-blue-400">{message}</div>
          )}
        </form>

        <div className="mt-6 text-center">
          <button 
            className="text-sm text-white hover:underline transition w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
