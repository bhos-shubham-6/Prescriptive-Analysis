import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiBaseUrl}/api/login`, { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Login</h2>
      {error && <div style={{ color: "red", marginBottom: 10 }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 10
          }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 15, paddingTop: 15, borderTop: "1px solid #eee" }}>
        <p style={{ margin: "0 0 10px 0" }}>Don't have an account?</p>
        <button
          onClick={onSwitchToRegister}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: 16
          }}
        >
          Register here
        </button>
      </div>
      {/* <div style={{ marginTop: 20, padding: 15, backgroundColor: "#f0f0f0", borderRadius: 4 }}>
        <p style={{ margin: "0 0 10px 0", fontWeight: "bold" }}>Demo Credentials:</p>
        <p style={{ margin: "5px 0" }}>Email: demo@example.com</p>
        <p style={{ margin: "5px 0" }}>Password: demo123</p>
      </div> */}
    </div>
  );
}
