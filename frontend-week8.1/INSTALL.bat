@echo off
echo ========================================
echo  Productivity Hub - Installation
echo ========================================
echo.

echo [1/3] Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js found!
node --version
echo.

echo [2/3] Installing dependencies...
echo This may take a few minutes...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [3/3] Setup complete!
echo.
echo ========================================
echo  Ready to start development!
echo ========================================
echo.
echo Run these commands:
echo   npm run dev       - Start development server
echo   npm run build     - Build for production
echo   npm run preview   - Preview production build
echo.
echo The app will open at: http://localhost:3000
echo.
pause
