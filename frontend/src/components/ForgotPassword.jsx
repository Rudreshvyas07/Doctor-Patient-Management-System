import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

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
    <div className="min-h-screen w-full flex items-center justify-center relative bg-gradient-to-br from-pink-50 via-white to-orange-50 overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-200/40 rounded-full blur-2xl animate-blob-slow" />
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-orange-200/30 rounded-full blur-xl animate-ping" />
      </div>

      <div className="bg-white shadow-xl rounded-2xl p-10 md:p-12 max-w-lg w-full border border-gray-100 z-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email to receive a password reset link.
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-pink-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold py-3 rounded-lg shadow-md hover:from-pink-600 hover:to-purple-600 transition-all text-lg tracking-wide disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          {message && (
            <div
              className={`text-center text-sm mt-2 ${
                message.includes("sent") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </div>
          )}
        </form>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-purple-500 hover:underline transition w-full"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
