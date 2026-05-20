@echo off
echo Recuperando la caja fuerte...
cd /d "%~dp0"
git checkout -b recuperacion_stash "stash@{0}"
echo Revisa tu codigo ahora.
pause
