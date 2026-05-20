@echo off
cd /d "%~dp0backend"
call npm.cmd run build
if errorlevel 1 (
  echo Error al compilar el backend.
  pause
  exit /b 1
)
node dist/src/index.js
