@echo off
chcp 65001 >nul
REM ============================================
REM 🚀 StoryFrame Studio - Local Dev Launcher
REM ============================================

cd /d %~dp0

echo Activating Python virtual environment...
call .venv\Scripts\activate

echo.
echo ✅ Python venv activated
echo.

REM --- Node.js / npm / vite 확인 ---
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ npm not found. Please install Node.js first.
    pause
    exit /b
)

echo Installing dependencies (if needed)...
call npm install

echo.
echo Starting StoryFrame Studio development server...
echo ============================================

call npm run dev

echo.
pause
