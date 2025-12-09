$projectPath = $PSScriptRoot

# Start backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$projectPath'; .\venv\Scripts\python.exe backend/app.py"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend
cd $projectPath/frontend
npm start
