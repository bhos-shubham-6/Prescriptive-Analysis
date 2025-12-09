import React, { useState } from "react";
import axios from "axios";
import './PlacementForm.css';

export default function PlacementForm() {
  const [form, setForm] = useState({
    StudentName: "",
    Branch: "",
    StudentID: 0,
    CGPA: 0,
    Internships: 0,
    Projects: 0,
    "Workshops/Certifications": 0,
    AptitudeTestScore: 0,
    SoftSkillsRating: 0,
    ExtracurricularActivities: "No",
    PlacementTraining: "No",
    SSC_Marks: 0,
    HSC_Marks: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (k, v) => setForm((prev) => ({ ...prev, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
      const resp = await axios.post(`${apiBaseUrl}/predict`, form, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setResult(resp.data);
    } catch (err) {
      console.error("Prediction error:", err);
      setResult({ error: err.response?.data?.error || err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pf-container">
      <div className="pf-card">
        <form onSubmit={submit} className="pf-form">
          <div className="pf-subtitle">{form.StudentName ? `${form.StudentName} — ${form.Branch}` : ''}</div>
          <div className="pf-grid">
            <div className="pf-group">
              <label className="pf-label">Student Name</label>
              <input
                className="pf-input"
                type="text"
                value={form.StudentName}
                onChange={(e) => handleChange("StudentName", e.target.value)}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Branch</label>
              <input
                className="pf-input"
                type="text"
                value={form.Branch}
                onChange={(e) => handleChange("Branch", e.target.value)}
              />
            </div>
            <div className="pf-group">
              <label className="pf-label">Student ID</label>
              <input
                className="pf-input"
                type="number"
                value={form.StudentID}
                onChange={(e) => handleChange("StudentID", parseInt(e.target.value || 0, 10))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">CGPA</label>
              <input
                className="pf-input"
                type="number"
                step="0.1"
                value={form.CGPA}
                onChange={(e) => handleChange("CGPA", parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Internships</label>
              <input
                className="pf-input"
                type="number"
                value={form.Internships}
                onChange={(e) => handleChange("Internships", parseInt(e.target.value || 0, 10))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Projects</label>
              <input
                className="pf-input"
                type="number"
                value={form.Projects}
                onChange={(e) => handleChange("Projects", parseInt(e.target.value || 0, 10))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Workshops / Certifications</label>
              <input
                className="pf-input"
                type="number"
                value={form["Workshops/Certifications"]}
                onChange={(e) => handleChange("Workshops/Certifications", parseInt(e.target.value || 0, 10))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Aptitude Test Score</label>
              <input
                className="pf-input"
                type="number"
                value={form.AptitudeTestScore}
                onChange={(e) => handleChange("AptitudeTestScore", parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Soft Skills Rating</label>
              <input
                className="pf-input"
                type="number"
                step="0.1"
                value={form.SoftSkillsRating}
                onChange={(e) => handleChange("SoftSkillsRating", parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">Extracurricular Activities</label>
              <select
                className="pf-select"
                value={form.ExtracurricularActivities}
                onChange={(e) => handleChange("ExtracurricularActivities", e.target.value)}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="pf-group">
              <label className="pf-label">Placement Training</label>
              <select
                className="pf-select"
                value={form.PlacementTraining}
                onChange={(e) => handleChange("PlacementTraining", e.target.value)}
              >
                <option>No</option>
                <option>Yes</option>
              </select>
            </div>

            <div className="pf-group">
              <label className="pf-label">SSC Marks</label>
              <input
                className="pf-input"
                type="number"
                value={form.SSC_Marks}
                onChange={(e) => handleChange("SSC_Marks", parseFloat(e.target.value || 0))}
              />
            </div>

            <div className="pf-group">
              <label className="pf-label">HSC Marks</label>
              <input
                className="pf-input"
                type="number"
                value={form.HSC_Marks}
                onChange={(e) => handleChange("HSC_Marks", parseFloat(e.target.value || 0))}
              />
            </div>
          </div>

          <div className="pf-actions">
            <button className="pf-btn" type="submit" disabled={loading}>
              {loading ? "Predicting..." : "Submit"}
            </button>
          </div>
        </form>

        {result && (
          <div className={`pf-result ${result.error ? 'pf-result-error' : (result.predicted === 'Placed' ? 'pf-result-success' : 'pf-result-warning')}`}>
            {result.error ? (
              <div>
                <div className="pf-result-title">Error</div>
                <p className="pf-result-message">{result.error}</p>
              </div>
            ) : (
              <div>
                <div className="pf-result-title">
                  {result.predicted === 'Placed' ? '✓ Likely to be Placed' : '✗ May Face Placement Challenges'}
                </div>
                <div className="pf-result-body">
                  <div className="pf-result-status">
                    <span className="pf-label">Prediction Status:</span>
                    <span className="pf-value">{result.predicted}</span>
                  </div>
                  {result.probability && (
                    <div className="pf-result-probability">
                      <span className="pf-label">Confidence Score:</span>
                      <span className="pf-value">{(result.probability * 100).toFixed(1)}%</span>
                    </div>
                  )}
                  <div className="pf-result-info">
                    <p>Based on your academic performance, skills, and experience.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
