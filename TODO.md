# TODO: Solucionar Firebase Auth + Flujo Registro/Login

## ✅ Información Gathered
- Error: "Missing required parameter: client_id" → OAuth Flask sin GOOGLE_CLIENT_ID/SECRET
- Firebase client configurado en `frontend/src/firebase.js` (usa VITE_*.env)
- Backend Flask actual (`backend/app.py`) usa OAuth redirect (roto)
- Backend anterior (`backend-flask/app.py`) valida idToken Firebase → reutilizar patrón
- firebase-key.json disponible en workspace root

## 📋 Plan Detallado
1. [x] `backend/requirements.txt` → agregar `firebase-admin==6.5.0`
2. [x] `backend/app.py` → 
   - Agregar endpoint `POST /auth/firebase-google` que valida idToken con Firebase Admin
   - Manejar usuario nuevo vs existente (perfil_completo=false para nuevos)
   - Crear sesión Flask y redirigir según estado
3. [x] `frontend/src/services/flaskAuthService.ts` → 
   - Cambiar `loginWithGoogle()` a Firebase popup → POST idToken al nuevo endpoint
4. [x] `frontend/src/components/auth/ComponenteLogin.tsx` → 
   - Manejar async/await en handleGoogleLogin + mejores errores
5. [ ] Probar: `npm run dev` frontend + backend → login sin error 400
6. [ ] Próximo: botón Registro/Login separados (después de auth fix)

## 🔧 Dependencias a editar
- backend/app.py (principal)
- backend/requirements.txt
- frontend/src/services/flaskAuthService.ts
- frontend/src/components/auth/ComponenteLogin.tsx

## ⏭️ Followup steps
- Instalar dependencias backend: `pip install -r backend/requirements.txt`
- Configurar .env backend con `FIREBASE_KEY_PATH=../firebase-key.json`
- Probar login Google → verificar sesión y dashboard
- Si OK → implementar botones separados registro/login
