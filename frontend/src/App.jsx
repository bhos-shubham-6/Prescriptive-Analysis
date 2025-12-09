import React, { useState, useEffect } from "react";
import PlacementForm from "./components/PlacementForm";
import PlacementCharts from "./components/PlacementCharts";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLoginSuccess = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleAuthMode = () => {
    setShowRegister(!showRegister);
  };

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegisterSuccess={toggleAuthMode} />
    ) : (
      <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={toggleAuthMode} />
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h1>Student Placement Prediction Dashboard</h1>
        <div>
          <span style={{ marginRight: 15 }}>Welcome, {user?.name}!</span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#dc3545",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        <div style={{ flex: 1 }}>
          <PlacementForm />
        </div>
        <div style={{ width: 420 }}>
          <PlacementCharts />
        </div>
      </div>
    </div>
  );
}