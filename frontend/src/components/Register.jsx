import React, { useState } from "react";
import axios from "axios";

export default function Register({ onRegisterSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    setLoading(true);

    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      await axios.post(`${apiBaseUrl}/api/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      setSuccess(true);
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setTimeout(() => {
        onRegisterSuccess();
      }, 2000);
    } catch (err) {
      console.error("Register error:", err);
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Register</h2>
      {error && <div style={{ color: "red", marginBottom: 10, padding: 10, backgroundColor: "#ffe0e0", borderRadius: 4 }}>{error}</div>}
      {success && <div style={{ color: "green", marginBottom: 10, padding: 10, backgroundColor: "#e0ffe0", borderRadius: 4 }}>Registration successful! Redirecting to login...</div>}
      <form onSubmit={handleRegister}>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Full Name</div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Email</div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Password</div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <label style={{ display: "block", marginBottom: 15 }}>
          <div style={{ marginBottom: 5, fontWeight: "bold" }}>Confirm Password</div>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
            style={{ width: "100%", padding: 10, border: "1px solid #ccc", borderRadius: 4, boxSizing: "border-box" }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: 10,
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: loading ? "not-allowed" : "pointer",
            marginBottom: 10
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 15, paddingTop: 15, borderTop: "1px solid #eee" }}>
        <p style={{ margin: "0 0 10px 0" }}>Already have an account?</p>
        <button
          onClick={onRegisterSuccess}
          style={{
            background: "none",
            border: "none",
            color: "#007bff",
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: 16
          }}
        >
          Login here
        </button>
      </div>
    </div>
  );
}
