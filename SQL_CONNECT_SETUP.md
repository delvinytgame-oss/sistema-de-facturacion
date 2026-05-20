# Firebase SQL Connect - VITUCA

Esta configuracion crea la base SQL relacional de VITUCA con Firebase SQL Connect.

## Archivos creados

- `dataconnect/schema/schema.gql`: modelo de datos PostgreSQL.
- `dataconnect/connector/queries.gql`: lecturas rapidas y paginadas.
- `dataconnect/connector/mutations.gql`: escrituras seguras por usuario.
- `dataconnect/connector/connector.yaml`: generacion del SDK web.
- `sistema_de_facturacion/frontend/src/dataconnect-generated`: SDK generado.

## Flujo recomendado

1. Validar y generar SDK:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Users\JDELV\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js' dataconnect:sdk:generate
```

2. Ver diferencia SQL antes de tocar produccion:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Users\JDELV\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js' dataconnect:sql:diff
```

3. Aplicar migracion cuando confirmes que el diff esta bien:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Users\JDELV\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js' dataconnect:sql:migrate
```

4. Desplegar SQL Connect:

```powershell
& 'C:\Program Files\nodejs\node.exe' 'C:\Users\JDELV\AppData\Roaming\npm\node_modules\firebase-tools\lib\bin\firebase.js' deploy --only dataconnect
```

## Reglas de velocidad usadas

- Todas las tablas de negocio tienen `ownerUid` para filtrar por `auth.uid`.
- Las listas principales usan `limit` y `offset`.
- Hay indices para pantallas frecuentes: productos, clientes, facturas, IMEIs/unidades y reparaciones.
- Las operaciones sensibles usan `@transaction`.
- Las mutaciones validan propiedad antes de escribir con `@check`.

## Nota importante

Firestore y SQL Connect pueden convivir durante la migracion. Primero se prueba SQL Connect, luego se cambia el frontend por modulo: perfil/negocio, productos, clientes, facturas y reparaciones.
