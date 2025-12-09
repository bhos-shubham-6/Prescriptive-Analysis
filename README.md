Student Placement Prediction

### Backend (Python)
1. Create a virtualenv and activate it.
2. Install dependencies:
   ```
   pip install -r backend/requirements.txt
   ```
3. Run the Flask app:
   ```
   python backend/app.py
   ```
   The API will be available at `http://0.0.0.0:5000/predict`.

### Frontend (React)
1. From `/frontend`, install Node deps:
   ```
   npm install
   ```
2. Start the dev server:
   ```
   npm start
   ```
   The React dev server will proxy requests to the backend if configured, or you can build and serve the frontend from Flask.
