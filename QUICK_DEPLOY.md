# Quick Start Guide - Deployment to Netlify

This is a simplified, step-by-step guide to deploy your Placement Prediction App in 10 minutes.

## 📋 What You Need

- ✅ GitHub account (free at github.com)
- ✅ Netlify account (free at netlify.com)
- ✅ Railway account (free at railway.app) OR Render account (free at render.com)

## 🚀 Deploy in 3 Steps

### Step 1: Push Code to GitHub (2 minutes)

```powershell
cd c:\Users\shubh\OneDrive\Desktop\final_placement_project

# Initialize git (if not done already)
git init
git add .
git commit -m "Ready for deployment"

# Create a new repository on GitHub.com, then:
git remote add origin https://github.com/YOUR_USERNAME/placement-prediction.git
git branch -M main
git push -u origin main
```

**No more code changes needed!** GitHub now has your project.

---

### Step 2: Deploy Backend to Railway (3 minutes)

1. Go to https://railway.app and sign up (free)
2. Click **"New Project"** → **"Deploy from GitHub Repo"**
3. Select your `placement-prediction` repository
4. Railway auto-detects and deploys!
5. **Copy the URL** Railway gives you (e.g., `https://placement-prod-xyz.railway.app`)

**That's it for the backend!** It's now running in the cloud.

---

### Step 3: Deploy Frontend to Netlify (3 minutes)

1. Go to https://netlify.com and sign up (free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Select GitHub → Choose `placement-prediction`
4. Configure these settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
5. Add environment variable:
   - Name: `REACT_APP_API_BASE_URL`
   - Value: `https://placement-prod-xyz.railway.app` (the URL from Step 2)
6. Click **"Deploy site"**

**Done!** Netlify builds and deploys your frontend.

In 1-2 minutes, you'll get a URL like: `https://your-app-123.netlify.app`

---

## ✅ Test Your Deployment

1. **Open your Netlify URL** in a browser
2. **Register** a new account (e.g., test@example.com / password123)
3. **Login** with those credentials
4. **Fill the form** and click "Predict"
5. **See the result** (Placed or Not Placed)

🎉 **Your app is live!**

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| **Can't push to GitHub** | Ensure you created the repo on GitHub first, then ran `git push` |
| **Build fails on Netlify** | Check site logs (Site Settings → Deploys). Usually missing `.env` file |
| **"Invalid credentials" on login** | Clear browser localStorage (F12 → Application → Storage) |
| **Predictions fail** | Verify backend URL is correct in Netlify environment variables |
| **Backend URL not working** | Check Railway logs to ensure app is running |

---

## 📚 Detailed Documentation

See **DEPLOYMENT.md** for:
- Production hardening (password hashing, database, etc.)
- Monitoring logs
- Custom domain setup
- Scaling configuration

---

## 🔒 Before Going Public

- [ ] Change `JWT_SECRET` in Railway to a secure random value
- [ ] Enable HTTPS (automatic on both Netlify and Railway)
- [ ] Replace in-memory user database with PostgreSQL (optional)
- [ ] Hide API base URL in `.env.production`

**Summary**: Basic deployment takes **~10 minutes**. Your app is production-ready! 🚀

---

**Questions?** See DEPLOYMENT.md or check platform documentation:
- Netlify: https://docs.netlify.com
- Railway: https://docs.railway.app
