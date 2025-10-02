import React, { useState } from "react";
import { User, AtSign, Lock } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../api/apiClient"; // axios instance

export default function SignUP() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !username || !email || !password || !confirm) {
      toast.error("Please fill all fields.", { position: "top-right" });
      return;
    }
    if (password !== confirm) {
      toast.error("Passwords do not match.", { position: "top-right" });
      return;
    }

    try {
      setLoading(true);
      const res = await apiClient.post("register/", {
        fullName,
        username,
        email,
        password,
      });

      // Save tokens in localStorage
      localStorage.setItem("access", res.data.tokens.access);
      localStorage.setItem("refresh", res.data.tokens.refresh);
      console.log("Registration response:", res.data);

      toast.success("Registration successful!", {
        position: "top-right",
        autoClose: 2500,
      });

      // Redirect after short delay
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.error || "Signup failed. Try again.", {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-center mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-sm text-gray-400 mb-6">
          Join Resellers Bay to start buying and selling academic book sets.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-2 text-gray-400" />
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full pl-11 pr-3 py-2 bg-black/60 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="relative">
            <User className="absolute left-3 top-2 text-gray-400" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Choose a unique username"
              className="w-full pl-11 pr-3 py-2 bg-black/60 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="relative">
            <AtSign className="absolute left-3 top-2 text-gray-400" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full pl-11 pr-3 py-2 bg-black/60 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2 text-gray-400" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Create a strong password"
              className="w-full pl-11 pr-3 py-2 bg-black/60 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2 text-gray-400" />
            <input
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type="password"
              placeholder="Re-enter your password"
              className="w-full pl-11 pr-3 py-2 bg-black/60 border border-gray-700 rounded text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded mt-2 disabled:opacity-50"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="text-center text-sm text-gray-400">
            Already have an account?{" "}
            <a href="/login" className="text-teal-400 hover:underline">
              Log In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
