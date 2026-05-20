@echo off
setlocal
echo.
echo ===== Liberar puerto 3005 (Frontend) =====
echo.

for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3005 ^| findstr LISTENING') do (
  set "PID=%%P"
  goto :FOUND
)

echo [OK] El puerto 3005 ya esta libre.
pause
exit /b 0

:FOUND
echo [INFO] PID detectado en 3005: %PID%
taskkill /PID %PID% /F >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No se pudo cerrar el proceso %PID%.
  echo Cierra manualmente la app que usa el puerto 3005.
  pause
  exit /b 1
)

echo [OK] Puerto 3005 liberado.
pause
