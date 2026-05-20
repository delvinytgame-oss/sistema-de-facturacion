# Guia Desktop Windows (Tauri)

## Estructura

- `frontend/`: interfaz React + Vite.
- `backend/`: API local (Express + Prisma).
- `frontend/src-tauri/`: capa desktop (ventana nativa, arranque backend y empaquetado MSI).

## Flujo local

1. Tauri abre la ventana desktop.
2. `src-tauri` inicia el backend automaticamente:
   - Desarrollo: `npm run dev:stable` en `backend/`.
   - Produccion: `backend-server.exe` empaquetado como recurso.
3. El frontend consume la API local:
   - Web dev: proxy `/api`.
   - Desktop: `http://127.0.0.1:5000/api`.

## Persistencia local

- En desktop, Tauri crea un archivo env en AppData:
  - `%APPDATA%/com.sistemafacturacion.desktop/backend.env`
- Base de datos SQLite local:
  - `%APPDATA%/com.sistemafacturacion.desktop/facturacion.db`

## Comandos

Desde la raiz `sistema_de_facturacion/`:

- `npm run desktop:dev`: abre la app desktop en modo desarrollo.
- `npm run desktop:build`: genera instalador MSI.

Tambien puedes usar:

- `setup_tauri.bat`: instala dependencias y ejecuta desktop dev.

## Requisitos de Windows

1. Node.js LTS.
2. Rust (Cargo) via `rustup`.
3. Microsoft C++ Build Tools (Desktop development with C++).
4. WebView2 Runtime (normalmente ya viene en Windows 11).

## Impresion y offline

- Impresion: se mantiene `window.print()` (dialogo de impresora de Windows).
- Offline: UI y backend local funcionan sin navegador externo.
- Al cerrar la app, Tauri detiene el proceso backend.

