@echo off
TITLE Sistema de Facturacion - CelStore Pro
echo ==========================================
echo        Iniciando CelStore Pro...
echo ==========================================
echo.

echo 1. Iniciando el Backend (Node.js API)...
cd backend
start "Backend API - CelStore" cmd /k "npm run dev"
cd ..

echo 2. Iniciando el Frontend (Vite React)...
cd frontend
start "Frontend Dash - CelStore" cmd /k "npm run dev"
cd ..

echo.
echo ==========================================
echo  El sistema ya esta levantado. Puedes 
echo  minimizar esta ventana negra.
echo ==========================================
echo.
echo Abriendo en el navegador web...
timeout /t 4 >nul
start http://localhost:3000
