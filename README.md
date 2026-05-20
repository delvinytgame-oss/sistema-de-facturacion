# 🚀 Vituca Pro - Sistema de Facturación, Inventario y Reparaciones

Este es el repositorio unificado de Vituca Pro, una plataforma integral para la gestión de negocios con soporte para terminales POS, administración web y un agente IA inteligente.

## 🏗️ Arquitectura

El proyecto ha sido unificado bajo una arquitectura de **Backend Único (Node.js)** siguiendo la recomendación de simplificación (Opción A).

- **Frontend:** React + Vite + Tailwind CSS (Puerto 3010)
- **Backend:** Node.js + Express + Prisma + SQLite (Puerto 5005)
- **Autenticación:** Firebase Authentication (Google, Email, Phone)

## 🛠️ Fixes Recientes (Mayo 2026)

Se han corregido los siguientes problemas críticos:

1.  **Unificación de Backend:** Se eliminó la dependencia de Flask, unificando toda la lógica de autenticación y APIs en el backend de Node.js.
2.  **Auth Flow:** El login ahora utiliza `firebaseLogin` en el backend, el cual valida tokens de Firebase y sincroniza automáticamente el perfil del usuario y su empresa única en la base de datos local.
3.  **DeviceCode Opcional:** Se modificó el backend para que el `deviceCode` sea opcional, permitiendo el acceso desde navegadores web y dispositivos móviles sin necesidad de un código de terminal POS.
4.  **Firestore Index:** Se corrigió el error `FAILED_PRECONDITION` mediante el despliegue de índices compuestos necesarios para la colección de productos y reportes.
5.  **CORS Restrictivo:** Se implementó una política de CORS segura en el backend que solo permite orígenes conocidos (localhost, dominios de Firebase).
6.  **Sincronización de Puertos:** Se estandarizó el uso del puerto **3010** para el desarrollo del frontend y **5005** para el backend.
7.  **TypeScript:** Se actualizaron las configuraciones de `tsconfig.json` para eliminar advertencias de opciones deprecadas.
8.  **Seguridad:** Se eliminaron credenciales hardcodeadas, moviéndolas a variables de entorno (.env).

## 🚀 Inicio Rápido

### Requisitos
- Node.js 22+
- Rust (para Tauri)

### Instalación
1. Instalar dependencias en la raíz:
   ```bash
   npm run install
   ```

### Desarrollo
Para iniciar frontend y backend simultáneamente:
```bash
cd sistema_de_facturacion
npm run dev
```

El frontend estará disponible en `http://localhost:3010` y el backend en `http://localhost:5005`.

### Escritorio (Tauri)
```bash
npm run desktop:dev
```

## 📁 Estructura del Proyecto
- `sistema_de_facturacion/frontend`: Código de la interfaz de usuario.
- `sistema_de_facturacion/backend`: API principal y lógica de negocio.
- `dataconnect`: Esquemas y consultas de Firebase Data Connect.
- `vituca-redesign`: Mockups y diseños del nuevo sitio.

## 🔒 Seguridad
- Todas las APIs están protegidas por el middleware `authenticateToken`.
- Los datos de cada usuario están aislados por `businessId`.
- No se deben subir archivos `.env` al repositorio.

---
*Documentación actualizada tras la corrección de errores críticos.*
