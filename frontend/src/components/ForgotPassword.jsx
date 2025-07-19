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
        setMessage("If an account exists, a reset link has been sent (check console in demo).");
      } else {
        setMessage(data.message || "Failed to send reset link");
      }
    } catch (err) {
      setMessage("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full flex flex-col justify-center border border-blue-100">
        <h2 className="text-2xl font-extrabold text-gray-800 mb-2 text-center">Forgot Password</h2>
        <p className="text-gray-500 mb-4 text-center">Enter your email to receive a password reset link.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition text-lg tracking-wide"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
          {message && <div className="text-center text-sm mt-2 text-blue-600">{message}</div>}
        </form>
        <button className="mt-4 text-blue-600 hover:underline text-sm" onClick={() => navigate("/login")}>Back to Login</button>
      </div>
    </div>
  );
} 