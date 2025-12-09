import React, { useEffect } from "react";
import axios from "axios";

const ADMIN_EMAIL = "demo@example.com";
const ADMIN_PASSWORD = "demo123";

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  useEffect(() => {
    handleAdminLogin();
  }, []);

  const handleAdminLogin = async () => {
    try {
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiBaseUrl}/api/login`, { 
        email: ADMIN_EMAIL, 
        password: ADMIN_PASSWORD 
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      onLoginSuccess();
    } catch (err) {
      console.error("Auto-login error:", err);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "50px auto", padding: 20, border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Admin Login</h2>
      <p style={{ color: "#666", marginBottom: 20 }}>Logging in with admin credentials...</p>
      <div style={{ textAlign: "center", padding: 20 }}>
        <div style={{ fontSize: 24, marginBottom: 10 }}>⏳</div>
        <p>Please wait...</p>
      </div>
    </div>
  );
}
