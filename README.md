# Student Placement Prediction - Final Project

## Structure

```
/backend         # Flask API (serves /predict)
  app.py
  model.joblib
  requirements.txt

/frontend        # React app (create-react-app style)
  package.json
  public/
  src/

/assets
  placement_distribution.png
  feature_importances.png
  example_input.json

README.md
```

## Quick start (development)

### Backend (Python/Flask)
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

## Usage
- Open the React app, fill the form (fields prefilled by `assets/example_input.json`) and click **Submit**.
- The backend will return a JSON with `predicted` and `probability`.

## Notes
- Model was trained and saved as `backend/model.joblib`.
- If you prefer Node backend or ONNX model, convert `model.joblib` accordingly.