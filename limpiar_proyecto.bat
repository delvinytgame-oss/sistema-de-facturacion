@echo off
echo ==============================================
echo  LIMPIEZA PROFUNDA DEL WORKSPACE (VITUCA)
echo ==============================================
echo.

set ROOT_DIR=%~dp0
set SIS_DIR=%ROOT_DIR%sistena de facturacion\

echo [1/4] Eliminando codigo muerto (Python / Cloud Functions)...
if exist "%ROOT_DIR%.venv" rmdir /S /Q "%ROOT_DIR%.venv"
if exist "%ROOT_DIR%iniciar_python.bat" del /Q "%ROOT_DIR%iniciar_python.bat"
if exist "%SIS_DIR%backend\database.db" del /Q "%SIS_DIR%backend\database.db"
if exist "%SIS_DIR%functions" rmdir /S /Q "%SIS_DIR%functions"
if exist "%SIS_DIR%scaffold.js" del /Q "%SIS_DIR%scaffold.js"
if exist "%ROOT_DIR%.claude" rmdir /S /Q "%ROOT_DIR%.claude"

echo [2/4] Eliminando archivos de log masivos...
if exist "%ROOT_DIR%dataconnect-debug.log" del /Q "%ROOT_DIR%dataconnect-debug.log"
if exist "%ROOT_DIR%firebase-debug.log" del /Q "%ROOT_DIR%firebase-debug.log"
if exist "%ROOT_DIR%pglite-debug.log" del /Q "%ROOT_DIR%pglite-debug.log"
if exist "%ROOT_DIR%runner-err.log" del /Q "%ROOT_DIR%runner-err.log"
if exist "%ROOT_DIR%runner-out.log" del /Q "%ROOT_DIR%runner-out.log"
if exist "%ROOT_DIR%backend-err.log" del /Q "%ROOT_DIR%backend-err.log"
if exist "%ROOT_DIR%backend-out.log" del /Q "%ROOT_DIR%backend-out.log"
if exist "%SIS_DIR%backend-debug.log" del /Q "%SIS_DIR%backend-debug.log"
if exist "%SIS_DIR%firebase-debug.log" del /Q "%SIS_DIR%firebase-debug.log"

echo [3/4] Limpiando documentacion antigua y notas...
if exist "%ROOT_DIR%ANALISIS_WORKSPACE_VITUCA.md" del /Q "%ROOT_DIR%ANALISIS_WORKSPACE_VITUCA.md"
if exist "%ROOT_DIR%HOJA_DE_RUTA.md" del /Q "%ROOT_DIR%HOJA_DE_RUTA.md"
if exist "%ROOT_DIR%RESUMEN_ERRORES.md" del /Q "%ROOT_DIR%RESUMEN_ERRORES.md"
if exist "%ROOT_DIR%TABLA_COMPARATIVA.md" del /Q "%ROOT_DIR%TABLA_COMPARATIVA.md"
if exist "%ROOT_DIR%TODO.md" del /Q "%ROOT_DIR%TODO.md"
if exist "%SIS_DIR%GUIA_MIGRACION_FIREBASE.md" del /Q "%SIS_DIR%GUIA_MIGRACION_FIREBASE.md"
if exist "%ROOT_DIR%SNIPPETS_CODIGO_FIXES.md" del /Q "%ROOT_DIR%SNIPPETS_CODIGO_FIXES.md"
if exist "%ROOT_DIR%SQL_CONNECT_SETUP.md" del /Q "%ROOT_DIR%SQL_CONNECT_SETUP.md"

echo [4/4] Limpieza finalizada. Eliminando este script...
if exist "%ROOT_DIR%clean_python_legacy.bat" del /Q "%ROOT_DIR%clean_python_legacy.bat"

echo.
echo Limpieza completada con exito. El workspace ahora esta optimizado.
pause
(goto) 2>nul & del "%~f0"
