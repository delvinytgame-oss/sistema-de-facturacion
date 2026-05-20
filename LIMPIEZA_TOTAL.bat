@echo off
echo.
echo ===== LIMPIEZA TOTAL DE PROCESOS =====
echo Cerrando Node.js, Vite y Tauri...
echo.

taskkill /F /IM node.exe /T 2>nul
taskkill /F /IM vite.exe /T 2>nul
taskkill /F /IM tauri.exe /T 2>nul

echo.
echo [OK] Procesos cerrados.
echo Intentando liberar puertos especificos por si acaso...

for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3001 ^| findstr LISTENING') do taskkill /PID %%P /F 2>nul
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3005 ^| findstr LISTENING') do taskkill /PID %%P /F 2>nul
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :3010 ^| findstr LISTENING') do taskkill /PID %%P /F 2>nul
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :5000 ^| findstr LISTENING') do taskkill /PID %%P /F 2>nul
for /f "tokens=5" %%P in ('netstat -ano ^| findstr :5001 ^| findstr LISTENING') do taskkill /PID %%P /F 2>nul

echo.
echo [LISTO] El sistema deberia estar limpio.
echo Ya puedes intentar ejecutar: npm run dev
pause
