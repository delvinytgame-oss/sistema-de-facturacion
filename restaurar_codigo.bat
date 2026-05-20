@echo off
echo ============================================
echo   RESTAURANDO CODIGO DESDE GIT...
echo ============================================
echo.

cd /d "c:\Users\JDELV\OneDrive\Desktop\sistema_de_facturacion\sistema_de_facturacion"

echo Directorio actual: %CD%
echo.

git checkout -- .

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo   EXITO! Codigo restaurado correctamente.
    echo ============================================
) else (
    echo.
    echo ERROR: No se pudo restaurar. 
)

echo.
pause
