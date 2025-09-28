import React, { useState } from "react";
import { Key } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import apiClient from "../api/apiClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("password-reset/", { email });
      toast.success(
        "If an account exists for this email, you'll receive a reset link shortly."
      );
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md border-2 border-purple-300/50 rounded-md bg-gray-900 p-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-2 rounded-full bg-transparent text-teal-400 mb-4">
            <Key className="w-8 h-8" />
          </div>

          <h1 className="text-2xl md:text-3xl font-semibold text-white mb-2">
            Reset Password
          </h1>
          <p className="text-sm text-gray-400 max-w-[26rem] mb-4">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@example.com"
            disabled={loading}
            className="w-full bg-black/70 border border-gray-700 rounded px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded font-medium disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>

          <div className="text-center mt-2">
            <Link to="/login" className="text-sm text-gray-300 hover:underline">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
