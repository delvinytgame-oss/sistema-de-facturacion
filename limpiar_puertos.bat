@echo off
setlocal
echo.
echo ===== Limpiando Puertos Vituca (3010 y 5005) =====
echo.

:: Puerto 3010 (Frontend)
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3010 ^| findstr LISTENING') do (
  echo [INFO] PID detectado en 3010: %%P
  taskkill /PID %%P /F >nul 2>nul
)

:: Puerto 5005 (Backend)
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :5005 ^| findstr LISTENING') do (
  echo [INFO] PID detectado en 5005: %%P
  taskkill /PID %%P /F >nul 2>nul
)

:: Puerto 3001 (Antiguo Frontend)
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
  echo [INFO] PID detectado en 3001: %%P
  taskkill /PID %%P /F >nul 2>nul
)

:: Puerto 5000 (Antiguo Backend)
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do (
  echo [INFO] PID detectado en 5000: %%P
  taskkill /PID %%P /F >nul 2>nul
)

echo [OK] Puertos liberados. Puedes ejecutar 'npm run dev' ahora.
echo.
pause
