@echo off
setlocal
echo.
echo ===== Liberar puerto 3001 =====
echo.

for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do (
  set "PID=%%P"
  goto :FOUND
)

echo [OK] El puerto 3001 ya esta libre.
pause
exit /b 0

:FOUND
echo [INFO] PID detectado en 3001: %PID%
taskkill /PID %PID% /F >nul 2>nul
if errorlevel 1 (
  echo [ERROR] No se pudo cerrar el proceso %PID%.
  echo Cierra manualmente la app que usa el puerto 3001.
  pause
  exit /b 1
)

echo [OK] Puerto 3001 liberado.
pause
