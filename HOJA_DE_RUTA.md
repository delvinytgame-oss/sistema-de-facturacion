# ⏱️ HOJA DE RUTA - Implementar Fixes (8-12 horas)

## 📅 CRONOGRAMA RECOMENDADO

### DÍA 1: MAÑANA (3-4 horas)

#### 1. Análisis y Decisión (30 min)
- [ ] Leer RESUMEN_ERRORES.md
- [ ] Leer ANALISIS_WORKSPACE_VITUCA.md
- [ ] Decisión: ¿Eliminar Flask (Opción A) o mantener separado (Opción B)?
- [ ] Reunión con equipo para confirmar dirección

**Recomendación:** OPCIÓN A (Eliminar Flask)

#### 2. Crear archivo .env (15 min)
- [ ] Copiar SNIPPETS_CODIGO_FIXES.md > Sección 3
- [ ] Crear archivo `.env` en raíz del proyecto
- [ ] Llenar valores mínimos:
  ```
  PORT=5000
  JWT_SECRET=tu-secret-temporal
  FRONTEND_URL=http://localhost:3000
  EMAIL_USER=correo@gmail.com
  EMAIL_PASS=app-password
  ```
- [ ] Verificar que `.env` está en `.gitignore`

#### 3. Crear archivo .env.example (10 min)
- [ ] Copiar estructura de `.env`
- [ ] Remover valores sensibles
- [ ] Agregar comentarios explicativos
- [ ] Commit: `git add .env.example`

#### 4. Fix CRÍTICO: Hacer deviceCode Opcional (60 min)
- [ ] Abrir `backend/src/controllers/auth.controller.ts`
- [ ] Copiar código DESPUÉS de SNIPPETS_CODIGO_FIXES.md > Sección 1
- [ ] Reemplazar función `login`
- [ ] Cambiar estructura de respuesta
- [ ] Test: `npm run dev` en backend
- [ ] Probar endpoint con Postman:
  ```
  POST /api/auth/login
  { "username": "test", "password": "123", "deviceCode": null }
  ```
- [ ] Verificar que responde sin error

#### 5. Fix IMPORTANTE: CORS Restrictivo (30 min)
- [ ] Abrir `backend/src/app.ts`
- [ ] Copiar código DESPUÉS de SNIPPETS_CODIGO_FIXES.md > Sección 2
- [ ] Reemplazar `app.use(cors())`
- [ ] Agregar opciones de CORS
- [ ] Test: Probar desde http://localhost:3001
- [ ] Verificar que CORS permite localhost:3001

**BREAK: 1 hora**

---

### DÍA 1: TARDE (2-3 horas)

#### 6. Fix IMPORTANTE: Credenciales Email (20 min)
- [ ] Abrir `backend-flask/app.py`
- [ ] Copiar código DESPUÉS de SNIPPETS_CODIGO_FIXES.md > Sección 4
- [ ] Reemplazar función `send_verification_email`
- [ ] Verificar que usa env vars

#### 7. Fix MODERADO: tsconfig.json (20 min)
- [ ] Abrir `frontend/tsconfig.json`
- [ ] Copiar código DESPUÉS de SNIPPETS_CODIGO_FIXES.md > Sección 5
- [ ] Reemplazar `compilerOptions`
- [ ] Agregar `"ignoreDeprecations": "6.0"`
- [ ] Run `npm run type-check` en frontend
- [ ] Verificar que no hay errores TS

#### 8. Firebase Configuration (30 min - IMPORTANTE)
- [ ] Ir a https://console.firebase.google.com
- [ ] Crear proyecto o usar existente
- [ ] Ir a "Configuración del proyecto"
- [ ] Descargar JSON de credenciales (Admin SDK)
- [ ] Copiar valores a `.env`:
  ```
  FIREBASE_PROJECT_ID=valor
  FIREBASE_CLIENT_EMAIL=valor
  FIREBASE_PRIVATE_KEY=valor
  ```
- [ ] También configurar Web API Key:
  ```
  VITE_FIREBASE_API_KEY=valor
  VITE_FIREBASE_AUTH_DOMAIN=valor
  VITE_FIREBASE_PROJECT_ID=valor
  VITE_FIREBASE_APP_ID=valor
  VITE_FIREBASE_MESSAGING_SENDER_ID=valor
  ```
- [ ] Guardar `.env`
- [ ] Test en frontend: abrir DevTools > Console
- [ ] Verificar que no hay errores de Firebase

#### 9. Pruebas Integración (30 min)
- [ ] Terminal 1: `npm run dev` en backend
- [ ] Terminal 2: `npm run dev` en frontend
- [ ] Abrir http://localhost:3001
- [ ] Intentar registro con email
- [ ] Verificar que OTP se envía
- [ ] Completar registro
- [ ] Loguear sin deviceCode
- [ ] Verificar que dashboard carga
- [ ] Probar algunas APIs

#### 10. Documentación (30 min)
- [ ] Actualizar README.md con instrucciones
- [ ] Agregar sección de configuración
- [ ] Agregar links a archivos de análisis
- [ ] Commit: `git add -A && git commit -m "docs: agregar guía de configuración"`

---

### DÍA 2: SI NECESITAN OPCIÓN B (2-3 horas)

*Solo si decidieron mantener Flask como servicio separado*

#### 11. Agregar proxy para Flask (30 min)
- [ ] Abrir `frontend/vite.config.js`
- [ ] Agregar proxy para `/api/auth` → :5001
- [ ] Agregar proxy para `/api` → :5000
- [ ] Copiar configuración de SNIPPETS > Sección 6

#### 12. Actualizar flaskAuthService.ts (20 min)
- [ ] Cambiar `FLASK_API_URL` a rutas relativas
- [ ] Cambiar de `http://localhost:5001/api/auth` a `/api/auth`
- [ ] Copiar código de SNIPPETS > Sección 6

#### 13. Sincronizar puertos (10 min)
- [ ] `frontend/package.json`: cambiar `:3000` a `:3001`
- [ ] `public-url.ts`: cambiar `:3000` a `:3001`

---

## 🧪 CHECKLIST DE VALIDACIÓN

### Post-Fix Testing

```bash
# Terminal 1: Backend Node
cd backend
npm install
npm run dev

# Terminal 2: Backend Flask (si lo usan)
cd backend-flask
python app.py

# Terminal 3: Frontend
cd frontend
npm install
npm run dev

# Terminal 4: Tests
```

#### Test 1: Registro ✅
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "nombre": "Test User"
  }'

# Respuesta esperada:
# { "message": "OK", "email": "test@example.com" }
```

#### Test 2: Verificar OTP ✅
```bash
# Obtener código del email/console
curl -X POST http://localhost:5000/api/auth/verify \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "code": "123456"
  }'

# Respuesta esperada:
# { "status": "verified" }
```

#### Test 3: Login SIN deviceCode ✅
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test.user",
    "password": "Test123!",
    "deviceCode": null
  }'

# Respuesta esperada:
# {
#   "token": "eyJhbGc...",
#   "sessionType": "WEB",
#   "user": { ... },
#   "device": null
# }
```

#### Test 4: CORS Permitido ✅
```bash
curl -H "Origin: http://localhost:3001" \
  -H "Authorization: Bearer {token}" \
  http://localhost:5000/api/products

# Respuesta: Exitosa (permite origen)
```

#### Test 5: CORS Rechazado ✅
```bash
curl -H "Origin: http://example.com" \
  -H "Authorization: Bearer {token}" \
  http://localhost:5000/api/products

# Respuesta: Error CORS (rechaza origen)
```

#### Test 6: Firebase Google Login ✅
- [ ] Abrir http://localhost:3001
- [ ] Clic en "Login con Google"
- [ ] Completar login
- [ ] Verificar OTP
- [ ] Verificar acceso a dashboard

#### Test 7: APIs Funcionan ✅
- [ ] Login normalmente
- [ ] Ir a Dashboard
- [ ] Crear producto
- [ ] Crear factura
- [ ] Verificar datos en DB

---

## 🚀 DEPLOYMENT CHECKLIST

Antes de ir a producción:

### Seguridad
- [ ] Firebase configurado en producción
- [ ] Credenciales no en código (solo en .env)
- [ ] JWT_SECRET fuerte (32+ caracteres aleatorios)
- [ ] CORS restrictivo (dominios específicos)
- [ ] HTTPS activado

### Performance
- [ ] Base de datos optimizada
- [ ] Índices en campos de búsqueda
- [ ] Cache habilitado
- [ ] Logs configurados

### Testing
- [ ] Probar login con usuario existente
- [ ] Probar registro nuevo
- [ ] Probar Google OAuth
- [ ] Probar login POS con deviceCode
- [ ] Probar todas las APIs principales

### Documentación
- [ ] README.md actualizado
- [ ] Variables de .env documentadas
- [ ] Instrucciones de setup claras
- [ ] Guía de troubleshooting

---

## 📞 PROBLEMAS COMUNES

### 1. "Firebase configuration incomplete"
**Causa:** .env no tiene FIREBASE_*
**Solución:** Llenar variables de Firebase Console

### 2. "CORS block - Origin not allowed"
**Causa:** Frontend desde dominio no permitido
**Solución:** Agregar dominio a CORS whitelist en app.ts

### 3. "No token provided"
**Causa:** Usuario no logueo o token expiró
**Solución:** Loguear de nuevo

### 4. "Dispositivo requerido"
**Causa:** deviceCode es obligatorio en login
**Solución:** Aplicar fix de sección 1

### 5. "Cannot read property 'VITE_FIREBASE_*'"
**Causa:** Variables de entorno no cargadas
**Solución:** Reiniciar servidor Vite

### 6. "Email not configured"
**Causa:** EMAIL_USER o EMAIL_PASS no están en .env
**Solución:** Agregar credenciales a .env

---

## 📊 PROGRESS TRACKER

```
DÍA 1 MAÑANA
[====      ] 25% - Análisis y decisión
[========  ] 50% - Crear .env
[============] 75% - Fix deviceCode
[==============] 100% - CORS restrictivo

DÍA 1 TARDE
[===       ] 20% - Email seguro
[======    ] 40% - TypeScript
[=========  ] 60% - Firebase
[==========] 80% - Pruebas integración
[==============] 100% - Documentación

TOTAL: 8-12 horas
```

---

## ✅ DEFINITION OF DONE

Cuando los fixes estén completados:

- [ ] El archivo ANALISIS_WORKSPACE_VITUCA.md fue leído
- [ ] Decisión Flask vs Node fue tomada
- [ ] .env existe y tiene valores
- [ ] deviceCode es opcional en login
- [ ] CORS está restringido
- [ ] Firebase está configurado
- [ ] TypeScript sin deprecaciones
- [ ] Email no tiene credenciales hardcodeadas
- [ ] Registro → OTP → Verificación → Login funciona
- [ ] APIs responden correctamente
- [ ] Google OAuth funciona
- [ ] README actualizado
- [ ] Team informado de cambios

---

## 📚 REFERENCIAS RÁPIDAS

- Análisis completo: [ANALISIS_WORKSPACE_VITUCA.md](ANALISIS_WORKSPACE_VITUCA.md)
- Resumen de errores: [RESUMEN_ERRORES.md](RESUMEN_ERRORES.md)
- Código de fixes: [SNIPPETS_CODIGO_FIXES.md](SNIPPETS_CODIGO_FIXES.md)
- Este documento: [HOJA_DE_RUTA.md](HOJA_DE_RUTA.md)

---

**Generado:** 27 de Abril de 2026
**Tiempo estimado:** 8-12 horas
**Dificultad:** Media
**Prioridad:** ALTA (Sistema no funciona correctamente)
