@echo off
echo ========================================================
echo   RESTAURANDO DISENO PREMIUM (SAAS EDITION)
echo ========================================================
echo.

set "BASE_DIR=c:\Users\JDELV\OneDrive\Desktop\sistema_de_facturacion"
cd /d "%BASE_DIR%"

echo 1. Respaldando frontend actual (por si acaso)...
if exist "frontend_backup_malo" rmdir /s /q "frontend_backup_malo"
mkdir "frontend_backup_malo"
xcopy "frontend\*" "frontend_backup_malo\" /E /I /H /Y /Q > nul

echo 2. Restaurando ProyectoRecuperado_Frontend hacia frontend...
xcopy "ProyectoRecuperado_Frontend\*" "frontend\" /E /I /H /Y /Q > nul

echo.
echo ========================================================
echo   EXITO! Restauracion completada.
echo ========================================================
echo Por favor revisa la terminal donde tienes corriendo "npm run dev" 
echo o reinicialo presionando Ctrl+C y volviendolo a ejecutar. 
echo Tu diseno premium 3D Neumorfico (SAAS Edition) con todas 
echo las secciones y funciones ha vuelto.
echo.
pause
