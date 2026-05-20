# Migracion Firebase-Only (Sin Flask)

## Estado
- Autenticacion: Google con Firebase Authentication.
- Base de datos: Firestore (`usuarios`, `empresa`, `facturas`, `dispositivos`).
- Archivos: Firebase Storage (`empresa/{uid}/...`).
- Backend Flask/Python: eliminado del proyecto.

## 1) Configurar Firebase Console
1. Firebase Console > Authentication > Sign-in method > Google > Enable.
2. Authentication > Settings > Authorized domains:
   - `localhost`
   - `127.0.0.1`
3. Firestore Database > Create database (modo production recomendado).
4. Storage > Get started.

## 2) Variables en `frontend/.env`
Debes usar credenciales Web App reales:

```env
VITE_API_URL=
VITE_FIREBASE_API_KEY=TU_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=TU_PROJECT.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=TU_PROJECT_ID
VITE_FIREBASE_APP_ID=TU_APP_ID
VITE_FIREBASE_MESSAGING_SENDER_ID=TU_SENDER_ID
```

## 3) Reglas de seguridad
Archivos listos:
- `firestore.rules`
- `storage.rules`

Publica reglas:

```powershell
firebase deploy --only firestore:rules,storage
```

## 4) Colecciones usadas
- `usuarios/{uid}`
  - `email`, `fullName`, `photo`, `phone`, `empresaId`, `loginType`, `createdAt`, `updatedAt`
- `usuarios/{uid}/devices/{deviceCode}`
- `empresa/{uid}`
  - `nombre`, `telefono`, `direccion`, `logoUrl`
- `facturas/{facturaId}`
  - `ownerUid` obligatorio para reglas
- `dispositivos/{deviceCode}`

## 5) Flujo funcional
1. Login con Google.
2. Si el usuario no existe, se crea en `usuarios`.
3. Registro de equipo en Firestore.
4. Completar perfil (`empresa`, `telefono`, `direccion`) y guardar en Firestore.
5. Sesion persistente por Firebase Auth.

## 6) Desarrollo local
```powershell
cd frontend
npm run dev
```

## 7) Nota
El frontend ya no depende de Flask para autenticacion, verificacion ni perfil.
