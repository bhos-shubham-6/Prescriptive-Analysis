# Deployment Guide - Netlify + External Backend

This guide will help you deploy the Placement Prediction App to Netlify (frontend) and Railway/Render (backend).

## Architecture Overview

```
Frontend (React) → Netlify (Static Hosting)
        ↓
Backend (Flask) → Railway or Render (Python App Hosting)
        ↓
Model (joblib) → Stored in backend repository
```

## Prerequisites

- GitHub account (to host your repository)
- Netlify account (free: https://netlify.com)
- Railway OR Render account (free tier available)
- Git installed locally

## Step 1: Prepare Your Repository

1. Initialize git (if not already done):
```bash
cd c:\Users\shubh\OneDrive\Desktop\final_placement_project
git init
git add .
git commit -m "Initial commit: Placement prediction app ready for deployment"
```

2. Push to GitHub:
- Create a new repository on GitHub
- Add remote: `git remote add origin https://github.com/YOUR_USERNAME/placement-prediction.git`
- Push: `git push -u origin main`

## Step 2: Deploy Backend to Railway

### Option A: Railway (Recommended - Simpler)

1. **Sign up at https://railway.app**

2. **Connect GitHub Repository**:
   - Click "New Project" → "Deploy from GitHub Repo"
   - Select your placement-prediction repository
   - Select the `main` branch

3. **Configure Build & Start Command**:
   - In Railway Dashboard:
   - Go to "Variables" tab
   - Add these environment variables:
     ```
     PYTHON_VERSION=3.9
     JWT_SECRET=your-random-secret-key-here
     FLASK_ENV=production
     ```

4. **Set Start Command**:
   - In "Settings" tab → "Start Command":
     ```
     cd backend && pip install -r requirements.txt && python app.py
     ```

5. **Get Your Backend URL**:
   - Railway will provide a public URL like: `https://your-app-random-id.railway.app`
   - Save this URL - you'll need it for the frontend

### Option B: Render (Alternative)

1. **Sign up at https://render.com**

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect your GitHub repo
   - Configure:
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `cd backend && python app.py`
     - **Environment**: Python 3.9

3. **Set Environment Variables** in Render Dashboard:
   - `JWT_SECRET`: your-random-secret-key
   - `FLASK_ENV`: production

4. **Get Your Backend URL**: Render will assign a URL

## Step 3: Deploy Frontend to Netlify

### Setup Environment Variable

1. **Create `.env.production` in frontend directory**:
```
REACT_APP_API_BASE_URL=https://your-railway-backend-url.railway.app
```

Replace `your-railway-backend-url.railway.app` with your actual backend URL from Step 2.

2. **Update `frontend/src/App.jsx` and `frontend/src/components/PlacementForm.jsx`**:

In both files, find axios calls and update the baseURL:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL
});
```

### Deploy to Netlify

1. **Sign up at https://netlify.com**

2. **Connect GitHub Repository**:
   - Click "Add new site" → "Import an existing project"
   - Select GitHub
   - Choose your placement-prediction repository
   - **Important Settings**:
     - Base directory: `frontend`
     - Build command: `npm run build`
     - Publish directory: `build`

3. **Set Environment Variables in Netlify**:
   - Go to Site Settings → Environment
   - Add: `REACT_APP_API_BASE_URL=https://your-railway-url.railway.app`

4. **Deploy**:
   - Click "Deploy site"
   - Netlify will automatically build and deploy your frontend
   - Get your Netlify URL (e.g., `https://your-app-name.netlify.app`)

## Step 4: Test the Deployment

1. **Open your Netlify URL** in a browser
2. **Register a new account** or use demo credentials
3. **Submit a student form** and verify predictions work
4. **Check the browser console** (F12) for any errors

## Troubleshooting

### Frontend shows CORS errors
- **Solution**: Verify backend URL in `.env.production` and environment variables in Netlify dashboard
- Check that your backend is running and accessible

### Backend returns 404 errors
- **Solution**: Ensure environment variables are set in Railway/Render
- Check that `python app.py` is running without errors

### Model prediction returns errors
- **Solution**: Ensure `model.joblib` exists in `backend/` directory
- Re-run `python train_model.py` in backend directory

### Token/Auth errors
- **Solution**: Clear localStorage in browser (DevTools → Application → Storage)
- Set different `JWT_SECRET` in production environment

## Production Hardening (Optional but Recommended)

### 1. Update In-Memory Database to PostgreSQL

Create `backend/models.py`:
```python
from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(120))
    
    def set_password(self, password):
        self.password = bcrypt.hashpw(password.encode(), bcrypt.gensalt()).decode()
    
    def check_password(self, password):
        return bcrypt.checkpw(password.encode(), self.password.encode())
```

### 2. Use HTTPS Everywhere
- Railway/Render automatically provide HTTPS
- Netlify automatically provides HTTPS

### 3. Secure JWT Secret
- Generate a strong secret: `python -c "import secrets; print(secrets.token_urlsafe(32))"`
- Set in environment variables, never hardcode

### 4. Add Password Hashing
- Install: `pip install bcrypt`
- Update registration endpoint to hash passwords

## Monitoring & Logs

**Netlify**: Site Settings → Functions → Logs

**Railway**: Dashboard → Project → Logs

**Render**: Dashboard → Service → Logs

Check logs if something isn't working.

## Custom Domain (Optional)

**Netlify**: Site Settings → Domain Management → Add custom domain

**Railway**: Settings → Custom Domain

## Summary

✅ Frontend deployed on Netlify (static hosting, auto-updates on push)
✅ Backend deployed on Railway/Render (Python app hosting)
✅ Communication via environment variables
✅ Production-ready HTTPS everywhere
✅ Auto-scaling and monitoring included

Your app is now live and publicly accessible! 🚀

---

**Need Help?**
- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
