import React, { useState } from "react";
import apiClient from "../api/apiClient"; // <-- axios instance you created

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await apiClient.post("token/", { username, password });

      // Save tokens in localStorage
      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("user", JSON.stringify({ username }));

      alert("Login successful ✅", response.data);

      // Redirect to homepage (or dashboard)
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed ❌", err.response?.data || err.message);
      setError("Invalid username or password.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-black min-h-screen">
      <div className="w-full max-w-sm bg-gray-900 rounded-md shadow-md p-6">
        <div className="text-center mb-6">
          <div className="text-teal-400 font-bold text-2xl">ResellersBay</div>
          <h2 className="text-white text-xl font-semibold mt-2">
            Welcome Back
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="text-sm text-gray-300 block mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm text-gray-300 block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded font-semibold"
          >
            Sign In
          </button>

          <div className="flex items-center justify-center">
            <a
              href="/signup"
              className="bg-gray-800 w-full text-center text-white py-2 rounded hover:bg-gray-700"
            >
              Sign Up
            </a>
          </div>

          <div className="text-center">
            <a
              href="/forgot-password"
              className="text-xs text-gray-400 hover:underline"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
