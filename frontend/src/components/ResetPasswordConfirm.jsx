import { useParams } from "react-router-dom";
import { useState } from "react";
import apiClient from "../api/apiClient";

export default function ResetPasswordConfirm() {
  const { uid, token } = useParams();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!password || password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      await apiClient.post("password-reset-confirm/", {
        uid,
        token,
        new_password: password,
      });
      setMsg("Password has been reset. You can now log in.");
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to reset password");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="New password"
      />
      <input
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        placeholder="Confirm new password"
      />
      <button type="submit">Reset Password</button>
      {msg && <p>{msg}</p>}
      {error && <p>{error}</p>}
    </form>
  );
}
