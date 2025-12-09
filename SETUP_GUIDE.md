# Student Placement Prediction System - Complete Setup

## ✅ System Status: ALL RUNNING

### Frontend (React)
- **Status**: Running ✅
- **URL**: http://localhost:3000
- **Port**: 3000

### Backend (Flask)
- **Status**: Running ✅
- **URL**: http://localhost:5000
- **Port**: 5000

---

## 🔐 Authentication System

### Login & Registration Features
- **Registration Page**: Create new user account
- **Login Page**: Sign in with credentials
- **JWT Token Authentication**: Secure API calls
- **Protected Prediction API**: Only logged-in users can access

### Demo Credentials
```
Email: demo@example.com
Password: demo123
```

---

## 🚀 How to Use

### First Time Users
1. Click "Register here" on the login page
2. Enter Name, Email, and Password
3. Click "Register" button
4. After successful registration, you'll be returned to login page
5. Login with your credentials

### Existing Users
1. Enter email and password
2. Click "Login" button
3. You'll be redirected to the Placement Prediction Dashboard

### Using the Dashboard
1. After login, fill the placement prediction form with student details
2. Click "Submit" to get predictions
3. View results showing predicted placement status and probability
4. Click "Logout" to return to login page

---

## 📝 API Endpoints

### Authentication
- `POST /api/register` - Register new user
  ```json
  {
    "name": "Student Name",
    "email": "email@example.com",
    "password": "password123"
  }
  ```

- `POST /api/login` - Login user
  ```json
  {
    "email": "email@example.com",
    "password": "password123"
  }
  ```

### Prediction
- `POST /predict` - Get placement prediction
  - **Required Header**: `Authorization: Bearer {token}`
  - **Body**: Student data fields

---

## 🛠 Tech Stack

**Frontend:**
- React 18.2.0
- Axios (HTTP client)
- Chart.js (for visualizations)

**Backend:**
- Flask (Python web framework)
- PyJWT (Authentication)
- Flask-CORS (Cross-origin support)
- scikit-learn (ML predictions)
- pandas (Data processing)
- joblib (Model loading)

---

## 📁 Project Structure

```
/backend
  ├── app.py              # Flask API with auth & prediction
  ├── model.joblib        # Trained ML model
  └── requirements.txt    # Python dependencies

/frontend
  ├── package.json        # Node dependencies
  ├── public/
  │   └── index.html
  └── src/
      ├── App.jsx         # Main app component
      ├── index.js
      └── components/
          ├── Login.jsx           # Login form
          ├── Register.jsx        # Registration form
          ├── PlacementForm.jsx   # Prediction form
          └── PlacementCharts.jsx # Summary charts
```

---

## 🔄 How to Restart Servers

**Backend:**
```powershell
cd c:\Users\shubh\OneDrive\Desktop\final_placement_project
python backend/app.py
```

**Frontend:**
```powershell
cd c:\Users\shubh\OneDrive\Desktop\final_placement_project\frontend
npm start
```

**Both (in separate terminals):**
```powershell
.\run_both.ps1
```

---

## ✨ Features Implemented

✅ User Registration with validation
✅ User Login with JWT authentication
✅ Protected API endpoints (token-based)
✅ Placement prediction form
✅ Results display with predictions
✅ User logout functionality
✅ Welcome message with user name
✅ CORS enabled for cross-origin requests
✅ Error handling and user feedback
✅ Demo credentials for testing

---

## 🎯 Next Steps (Optional Enhancements)

- Add password hashing (bcrypt)
- Implement database (SQLite/PostgreSQL)
- Add email verification
- Password reset functionality
- User profile management
- Prediction history
- Mobile responsive design
- Production deployment

---

**Last Updated**: December 9, 2025
