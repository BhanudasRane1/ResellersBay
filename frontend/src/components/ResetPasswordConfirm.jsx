import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import apiClient from "../api/apiClient";
import { toast } from "react-toastify";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || password !== confirm) {
      toast.error("⚠️ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("password-reset-confirm/", {
        uid,
        token,
        new_password: password,
      });

      toast.success("Password has been reset. Please log in.");
      setTimeout(() => navigate("/login"), 1500); // redirect after success
    } catch (err) {
      toast.error(err.response?.data?.detail || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4">
      <div className="w-full max-w-md bg-gray-900 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">
          Reset Your Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            disabled={loading}
          />
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm new password"
            className="w-full bg-gray-800 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-teal-400"
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded font-semibold disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
