# 🔧 SNIPPETS DE CÓDIGO - FIXES RECOMENDADOS

## 1️⃣ FIX CRÍTICO: Hacer deviceCode Opcional

**Archivo:** `backend/src/controllers/auth.controller.ts`

**ANTES (❌ Roto):**
```typescript
export const login = async (req: Request, res: Response) => {
  const { username, password, deviceCode } = req.body;

  if (!deviceCode) {
    return res.status(400).json({
      error: 'DISPOSITIVO_REQUERIDO',
      message: 'Debe proporcionar el codigo de dispositivo (POS-XXX).',
    });
  }

  const device = await prisma.device.findUnique({
    where: { deviceCode },
  });

  if (!device || !device.isActive) {
    return res.status(403).json({
      error: 'DISPOSITIVO_NO_AUTORIZADO',
    });
  }
  
  // ... resto del código
};
```

**DESPUÉS (✅ Arreglado):**
```typescript
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, deviceCode } = req.body;

    const user = await prisma.user.findUnique({
      where: { username },
      include: { role: true },
    });

    if (!user || !user.isActive) {
      return res.status(401).json({
        error: 'USUARIO_INVALIDO',
        message: 'Credenciales inválidas o usuario inactivo.',
      });
    }

    if (user.loginType !== 'password') {
      return res.status(401).json({
        error: 'METODO_NO_VALIDO',
        message: 'Este usuario utiliza acceso con Google o teléfono.',
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'USUARIO_INVALIDO',
        message: 'Credenciales inválidas.',
      });
    }

    // ✅ CAMBIO: deviceCode es OPCIONAL
    let device = null;
    if (deviceCode) {
      device = await prisma.device.findUnique({
        where: { deviceCode },
      });

      if (!device || !device.isActive) {
        return res.status(403).json({
          error: 'DISPOSITIVO_NO_AUTORIZADO',
          message: 'Este equipo no está registrado o ha sido desactivado.',
        });
      }
    }

    // ✅ CAMBIO: Crear token con tipo de sesión
    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role.name,
        deviceId: device?.id || null,
        sessionType: device ? 'POS' : 'WEB',  // POS o WEB
      },
      JWT_SECRET,
      { expiresIn: '12h' }
    );

    // ✅ Crear sesión si es POS
    if (device) {
      await prisma.workSession.create({
        data: {
          userId: user.id,
          deviceId: device.id,
          status: 'ACTIVE',
        },
      });
    }

    res.json({
      token,
      sessionType: device ? 'POS' : 'WEB',
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        role: user.role.name,
      },
      device: device
        ? {
            code: device.deviceCode,
            name: device.deviceName,
          }
        : null,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      error: 'INTERNAL_ERROR',
      message: 'Error interno del servidor',
    });
  }
};
```

---

## 2️⃣ FIX IMPORTANTE: Implementar CORS Restrictivo

**Archivo:** `backend/src/app.ts`

**ANTES (❌ Inseguro):**
```typescript
import cors from 'cors';

const app = express();
app.use(cors());  // ⚠️ Permite TODOS los orígenes
```

**DESPUÉS (✅ Seguro):**
```typescript
import express from 'express';
import cors from 'cors';

const app = express();

// ✅ Configuración restrictiva de CORS
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      process.env.FRONTEND_URL,  // Para producción
    ].filter(Boolean);

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Device-Code'],
  maxAge: 86400, // 24 horas
};

app.use(cors(corsOptions));

// Para preflight requests
app.options('*', cors(corsOptions));
```

---

## 3️⃣ FIX IMPORTANTE: Configurar .env

**Archivo:** `.env` (crear en raíz del proyecto)

```bash
# ============================================
# FRONTEND
# ============================================
VITE_API_URL=http://localhost:3001/api
VITE_PUBLIC_APP_URL=http://localhost:3000
VITE_FLASK_API_URL=http://localhost:5001/api/auth

# Firebase Configuration (obtener de Firebase Console)
VITE_FIREBASE_API_KEY=AIzaSyDXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto-id
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef1234567890
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789

# ============================================
# BACKEND NODE
# ============================================
PORT=5000
NODE_ENV=development

# JWT Secret (cambiar en producción)
JWT_SECRET=tu-secret-key-super-segura-cambiar-en-produccion

# Firebase Admin SDK (obtener de Firebase Console)
FIREBASE_PROJECT_ID=tu-proyecto-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@tu-proyecto.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"

# Email Configuration (Gmail SMTP)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password  # ⚠️ NO la contraseña normal, usar App Password

# Frontend URL (para producción)
FRONTEND_URL=http://localhost:3000

# ============================================
# BACKEND FLASK (opcional si lo mantienes)
# ============================================
FLASK_ENV=development
FLASK_DEBUG=1
FLASK_PORT=5001

# Database
DB_URI=sqlite:///instance/dev.db

# Email (mismo que arriba)
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password

# Firebase Credentials File
FIREBASE_CRED_PATH=backend-flask/credenciales.json
```

**Archivo:** `.env.example` (para compartir con equipo)

```bash
# Copiar esto a .env y llenar con valores reales

# FRONTEND
VITE_API_URL=
VITE_PUBLIC_APP_URL=
VITE_FLASK_API_URL=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MESSAGING_SENDER_ID=

# BACKEND NODE
PORT=5000
NODE_ENV=development
JWT_SECRET=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
EMAIL_USER=
EMAIL_PASS=
FRONTEND_URL=
```

---

## 4️⃣ FIX IMPORTANTE: Configurar Email Seguro

**Archivo:** `backend-flask/app.py`

**ANTES (❌ Inseguro):**
```python
def send_verification_email(target_email, code):
    sender_email = os.environ.get("EMAIL_USER", "delvinyt.game@gmail.com")  # ⚠️ HARDCODEADA!
    sender_password = os.environ.get("EMAIL_PASS", "hofeapevgfrycwmf")      # ⚠️ HARDCODEADA!
```

**DESPUÉS (✅ Seguro):**
```python
def send_verification_email(target_email, code):
    sender_email = os.environ.get("EMAIL_USER")
    sender_password = os.environ.get("EMAIL_PASS")
    
    if not sender_email or not sender_password:
        logger.error("Email credentials not configured in .env")
        raise ValueError("EMAIL_USER and EMAIL_PASS must be set in environment")
    
    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Verifica tu cuenta - Vituca POS"
    msg["From"] = f"Vituca POS <{sender_email}>"
    msg["To"] = target_email

    html = f"""
    <html>
    <body style="background-color: #1a1a1a; color: #ffffff; font-family: sans-serif; padding: 40px; text-align: center;">
        <div style="max-width: 500px; margin: auto; background-color: #242424; padding: 30px; border-radius: 20px; border: 1px solid #333;">
            <h1 style="color: #7fdbff;">¡Bienvenido a Vituca!</h1>
            <p style="color: #ccc;">Usa el siguiente código para verificar tu cuenta:</p>
            <div style="background-color: #1a1a1a; padding: 20px; border-radius: 15px; margin: 30px 0; border: 2px dashed #7fdbff;">
                <span style="font-size: 42px; font-weight: bold; letter-spacing: 10px; color: #7fdbff;">{code}</span>
            </div>
            <p style="font-size: 12px; color: #666;">Este código expirará en 10 minutos.</p>
        </div>
    </body>
    </html>
    """
    msg.attach(MIMEText(html, "html"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, target_email, msg.as_string())
        logger.info(f"Email sent successfully to {target_email}")
        return True
    except Exception as e:
        logger.error(f"Error sending email to {target_email}: {e}")
        return False
```

---

## 5️⃣ FIX MODERADO: Actualizar tsconfig.json

**Archivo:** `frontend/tsconfig.json`

**ANTES (❌ Deprecated):**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "Node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

**DESPUÉS (✅ Correcto):**
```json
{
  "compilerOptions": {
    "ignoreDeprecations": "6.0",
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "exclude": ["node_modules", "dist"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

---

## 6️⃣ ALTERNATIVA: Mantener Flask con Proxy

Si deciden mantener Flask como servicio separado:

**Archivo:** `frontend/vite.config.js`

**ANTES (❌ Solo Node en proxy):**
```javascript
server: {
  strictPort: true,
  host: process.env.TAURI_DEV_HOST || false,
  port: 3001,
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    },
  },
}
```

**DESPUÉS (✅ Node + Flask en proxy):**
```javascript
server: {
  strictPort: true,
  host: process.env.TAURI_DEV_HOST || false,
  port: 3001,
  proxy: {
    // Flask Auth (puerto 5001)
    '/api/auth': {
      target: 'http://127.0.0.1:5001',
      changeOrigin: true,
      rewrite: (path) => path,
    },
    // Node APIs (puerto 5000)
    '/api': {
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
    },
  },
}
```

Y actualizar `flaskAuthService.ts`:

```typescript
// ✅ CAMBIO: Usar ruta relativa
const FLASK_API_URL = '/api/auth';

export const authService = {
  googleLogin: async (email: string, nombre: string, idToken?: string) => {
    const response = await fetch(`${FLASK_API_URL}/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, nombre, idToken }),
    });
    return response.json();
  },
  // ... resto igual
};
```

---

## 🧪 TESTS DE VERIFICACIÓN

```bash
# 1. Test endpoint sin deviceCode
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123",
    "deviceCode": null
  }'

# Respuesta esperada:
# {
#   "token": "eyJhbGc...",
#   "sessionType": "WEB",
#   "user": { "id": "...", "username": "testuser", ... },
#   "device": null
# }

# 2. Test CORS
curl -H "Origin: http://example.com" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS http://localhost:5000/api/products

# Respuesta esperada:
# Error 403 (correcto - origin no permitido)

# 3. Test con origin permitido
curl -H "Origin: http://localhost:3001" \
  -H "Access-Control-Request-Method: POST" \
  -X OPTIONS http://localhost:5000/api/products

# Respuesta esperada:
# Access-Control-Allow-Origin: http://localhost:3001
```

---

## 📋 RESUMEN DE CAMBIOS

| Archivo | Cambio | Línea |
|---------|--------|-------|
| `backend/src/controllers/auth.controller.ts` | Hacer deviceCode opcional | ~94 |
| `backend/src/app.ts` | Implementar CORS restrictivo | ~21 |
| `.env` | Crear archivo con configuración | NEW |
| `backend-flask/app.py` | Remover emails hardcodeadas | ~90-91 |
| `frontend/tsconfig.json` | Agregar ignoreDeprecations | NEW LINE |
| `frontend/vite.config.js` | Agregar proxy para Flask (opcional) | ~119 |

**Tiempo total:** 4-6 horas
