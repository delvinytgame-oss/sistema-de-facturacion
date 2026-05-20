const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const npmCommand = isWindows ? 'npm.cmd' : 'npm';
const rootDir = __dirname;
const frontendDir = path.join(rootDir, 'frontend');
const backendDir = path.join(rootDir, 'backend');

let frontendProcess = null;
let backendProcess = null;
let shuttingDown = false;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const pipeOutput = (child, label) => {
  if (child.stdout) {
    child.stdout.on('data', (chunk) => {
      process.stdout.write(`[${label}] ${chunk}`);
    });
  }

  if (child.stderr) {
    child.stderr.on('data', (chunk) => {
      process.stderr.write(`[${label}] ${chunk}`);
    });
  }
};

const spawnManaged = ({ cwd, label, args }) => {
  const command = isWindows ? 'cmd.exe' : npmCommand;
  const commandArgs = isWindows ? ['/d', '/s', '/c', npmCommand, ...args] : args;

  const child = spawn(command, commandArgs, {
    cwd,
    shell: false,
    windowsHide: false,
    env: {
      ...process.env,
      FORCE_COLOR: '1',
    },
  });

  pipeOutput(child, label);
  return child;
};

const startFrontend = () => {
  console.log('[runner] Iniciando frontend...');
  frontendProcess = spawnManaged({
    cwd: frontendDir,
    label: 'frontend',
    args: ['run', 'dev'],
  });

  frontendProcess.on('exit', (code) => {
    if (shuttingDown) return;
    console.error(`[runner] Frontend finalizo con codigo ${code}. Cerrando runner.`);
    shutdown(code || 1);
  });
};

const startBackendLoop = async () => {
  let restartCount = 0;

  while (!shuttingDown) {
    console.log('[runner] Iniciando backend...');
    backendProcess = spawnManaged({
      cwd: backendDir,
      label: 'backend',
      args: ['run', 'dev'],
    });

    const exitCode = await new Promise((resolve) => {
      backendProcess.on('exit', resolve);
    });

    backendProcess = null;

    if (shuttingDown) {
      return;
    }

    restartCount += 1;
    console.error(`[runner] Backend finalizo con codigo ${exitCode}. Reiniciando en 2 segundos... (intento ${restartCount})`);
    await wait(2000);
  }
};

const stopChild = (child) => {
  if (!child || child.killed) return;
  child.kill('SIGINT');
};

const shutdown = (exitCode = 0) => {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log('\n[runner] Cerrando procesos...');
  stopChild(frontendProcess);
  stopChild(backendProcess);
  setTimeout(() => process.exit(exitCode), 300);
};

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

startFrontend();
startBackendLoop().catch((error) => {
  console.error('[runner] Error fatal al iniciar backend:', error);
  shutdown(1);
});
