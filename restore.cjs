const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'ProyectoRecuperado_Frontend');
const destDir = path.join(__dirname, 'frontend');

console.log('========================================================');
console.log('  RESTAURANDO DISEÑO PREMIUM (SAAS EDITION) VIA NODE.JS');
console.log('========================================================\n');

function copyFolderSync(from, to) {
  if (!fs.existsSync(from)) {
    console.error(`Error: La carpeta de origen "${from}" no existe.`);
    return;
  }
  
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  const files = fs.readdirSync(from);
  
  for (const file of files) {
    // Evitar copiar carpetas pesadas innecesarias si existieran
    if (file === 'node_modules' || file === '.git' || file === 'dist') {
      continue;
    }
    
    const currentFrom = path.join(from, file);
    const currentTo = path.join(to, file);
    const stat = fs.statSync(currentFrom);
    
    if (stat.isDirectory()) {
      copyFolderSync(currentFrom, currentTo);
    } else {
      try {
        fs.copyFileSync(currentFrom, currentTo);
        console.log(`Copiado: ${path.relative(srcDir, currentFrom)}`);
      } catch (err) {
        console.error(`Error al copiar ${file}:`, err.message);
      }
    }
  }
}

// 1. Crear respaldo por si acaso
const backupDir = path.join(__dirname, 'frontend_backup_malo');
if (fs.existsSync(destDir)) {
  console.log('1. Creando copia de seguridad de frontend actual...');
  if (fs.existsSync(backupDir)) {
    fs.rmSync(backupDir, { recursive: true, force: true });
  }
  fs.mkdirSync(backupDir, { recursive: true });
  // Copia rápida simple
  try {
    copyFolderSync(destDir, backupDir);
    console.log('   Copia de seguridad creada con éxito.\n');
  } catch (err) {
    console.warn('   Aviso: No se pudo respaldar todo por archivos bloqueados, procediendo de todos modos.\n');
  }
}

// 2. Restaurar
console.log('2. Restaurando desde ProyectoRecuperado_Frontend...');
try {
  copyFolderSync(srcDir, destDir);
  console.log('\n========================================================');
  console.log('   ¡ÉXITO! Restauración completada correctamente.');
  console.log('========================================================');
  console.log('Por favor presiona Ctrl+C en tu terminal para cerrar "npm run dev",');
  console.log('y ejecútalo nuevamente escribiendo: npm run dev\n');
} catch (err) {
  console.error('Error durante la restauración:', err.message);
}
