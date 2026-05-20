@echo off
setlocal

cd /d "%~dp0"

echo ========================================================
echo   Configuracion Desktop (Tauri) - Sistema Facturacion
echo ========================================================
echo.

where cargo >nul 2>nul
if errorlevel 1 (
  echo [ERROR] Rust/Cargo no esta instalado.
  echo Instala Rust desde https://rustup.rs/ y vuelve a ejecutar este script.
  pause
  exit /b 1
)

echo Instalando dependencias de backend y frontend...
call npm.cmd --prefix backend install
if errorlevel 1 goto :fail

call npm.cmd --prefix frontend install
if errorlevel 1 goto :fail

echo.
echo Iniciando app de escritorio en modo desarrollo...
call npm.cmd --prefix frontend run desktop:dev
if errorlevel 1 goto :fail

echo.
echo Proceso finalizado correctamente.
pause
exit /b 0

:fail
echo.
echo [ERROR] Fallo la configuracion o ejecucion de Tauri.
pause
exit /b 1

