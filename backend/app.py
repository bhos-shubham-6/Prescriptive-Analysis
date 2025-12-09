from flask import Flask, request, jsonify, send_from_directory
import joblib
import pandas as pd
import os
import pickle
import warnings
import sys
from datetime import datetime, timedelta
import jwt
from flask_cors import CORS

warnings.filterwarnings('ignore')

app = Flask(__name__, static_folder="../frontend/build", static_url_path="/")
CORS(app)
app.config['SECRET_KEY'] = os.environ.get('JWT_SECRET', 'your-secret-key-change-this')

MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

model = None
try:
    with open(MODEL_PATH, 'rb') as f:
        model = joblib.load(f)
except Exception as e:
    try:
        print(f"Warning: Could not load model ({str(e)[:50]}...). Using demo mode.")
        class DummyModel:
            def predict(self, X):
                return ['Placed'] * len(X)
            def predict_proba(self, X):
                import numpy as np
                return np.array([[0.8, 0.2]] * len(X))
        model = DummyModel()
    except:
        pass

users_db = {
    "demo@example.com": {
        "id": "1",
        "name": "Demo User",
        "email": "demo@example.com",
        "password": "demo123"
    }
}

def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=7)
    }
    return jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')

def verify_token(token):
    try:
        data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        return data
    except:
        return None

@app.route("/api/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    name = data.get("name")

    if email in users_db:
        return jsonify({"message": "Email already exists"}), 400

    users_db[email] = {
        "id": str(len(users_db) + 1),
        "name": name,
        "email": email,
        "password": password
    }

    return jsonify({"message": "Registration successful"}), 201

@app.route("/api/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_db.get(email)
    if not user or user["password"] != password:
        return jsonify({"message": "Invalid email or password"}), 401

    token = generate_token(user["id"])
    return jsonify({
        "token": token,
        "user": {
            "id": user["id"],
            "name": user["name"],
            "email": user["email"]
        }
    }), 200

@app.route("/predict", methods=["POST"])
def predict():
    token = request.headers.get('Authorization', '').replace('Bearer ', '')
    if not verify_token(token):
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    if not isinstance(data, dict):
        return jsonify({"error":"Invalid input, expected JSON object"}), 400
    
    feature_cols = [
        'CGPA',
        'Internships',
        'Projects',
        'Workshops/Certifications',
        'AptitudeTestScore',
        'SoftSkillsRating',
        'ExtracurricularActivities',
        'PlacementTraining',
        'SSC_Marks',
        'HSC_Marks',
    ]
    
    filtered_data = {k: data.get(k, 0) for k in feature_cols}
    df = pd.DataFrame([filtered_data])
    
    try:
        pred = model.predict(df)[0]
        prob = None
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(df)
            prob = float(proba.max(axis=1)[0])
        return jsonify({"predicted": str(pred), "probability": prob})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        index_path = os.path.join(app.static_folder, "index.html")
        if os.path.exists(index_path):
            return send_from_directory(app.static_folder, "index.html")
        return "Frontend not built. Use the React frontend separately.", 200

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('FLASK_ENV') != 'production'
    app.run(host="0.0.0.0", port=port, debug=debug)