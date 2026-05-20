const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'frontend', 'src');

const pages = [
  // Ventas
  { path: 'ventas/NuevaVenta.jsx', name: 'NuevaVenta', id: 'ventas/nueva-venta' },
  { path: 'ventas/Facturas.jsx', name: 'Facturas', id: 'ventas/facturas' },
  { path: 'ventas/VentasPendientes.jsx', name: 'VentasPendientes', id: 'ventas/ventas-pendientes' },
  { path: 'ventas/Devoluciones.jsx', name: 'Devoluciones', id: 'ventas/devoluciones' },
  
  // Inventario
  { path: 'inventario/InventarioGeneral.jsx', name: 'InventarioGeneral', id: 'inventario/inventario-general' },
  { path: 'inventario/Productos.jsx', name: 'Productos', id: 'inventario/productos' },
  { path: 'inventario/ImeiSeries.jsx', name: 'ImeiSeries', id: 'inventario/imei-series' },
  { path: 'inventario/EntradasStock.jsx', name: 'EntradasStock', id: 'inventario/entradas-stock' },
  { path: 'inventario/SalidasStock.jsx', name: 'SalidasStock', id: 'inventario/salidas-stock' },
  
  // Clientes
  { path: 'clientes/ListaClientes.jsx', name: 'ListaClientes', id: 'clientes/lista-clientes' },
  { path: 'clientes/RegistrarCliente.jsx', name: 'RegistrarCliente', id: 'clientes/registrar-cliente' },
  { path: 'clientes/HistorialCompras.jsx', name: 'HistorialCompras', id: 'clientes/historial-compras' },
  
  // Reparaciones (EquiposIngresados already created)
  { path: 'reparaciones/EnProceso.jsx', name: 'EnProceso', id: 'reparaciones/en-proceso' },
  { path: 'reparaciones/ListosEntregar.jsx', name: 'ListosEntregar', id: 'reparaciones/listos-entregar' },
  { path: 'reparaciones/Entregados.jsx', name: 'Entregados', id: 'reparaciones/entregados' },
  
  // Caja
  { path: 'caja/AperturaCaja.jsx', name: 'AperturaCaja', id: 'caja/apertura-caja' },
  { path: 'caja/Movimientos.jsx', name: 'Movimientos', id: 'caja/movimientos' },
  { path: 'caja/CierreCaja.jsx', name: 'CierreCaja', id: 'caja/cierre-caja' },
  
  // Reportes
  { path: 'reportes/VentasDiarias.jsx', name: 'VentasDiarias', id: 'reportes/reportes-ventas-diarias' },
  { path: 'reportes/VentasMensuales.jsx', name: 'VentasMensuales', id: 'reportes/reportes-ventas-mensuales' },
  { path: 'reportes/ProductosMasVendidos.jsx', name: 'ProductosMasVendidos', id: 'reportes/productos-mas-vendidos' },
  { path: 'reportes/Ganancias.jsx', name: 'Ganancias', id: 'reportes/ganancias' },
  { path: 'reportes/StockDisponible.jsx', name: 'StockDisponible', id: 'reportes/stock-disponible' },
  
  // Garantias
  { path: 'garantias/RegistrarGarantia.jsx', name: 'RegistrarGarantia', id: 'garantias/registrar-garantia' },
  { path: 'garantias/Seguimiento.jsx', name: 'Seguimiento', id: 'garantias/seguimiento-garantias' },
  { path: 'garantias/Reemplazos.jsx', name: 'Reemplazos', id: 'garantias/reemplazos' },
  
  // Proveedores
  { path: 'proveedores/ListaProveedores.jsx', name: 'ListaProveedores', id: 'proveedores/lista-proveedores' },
  { path: 'proveedores/Compras.jsx', name: 'Compras', id: 'proveedores/compras-proveedores' },
  { path: 'proveedores/Historial.jsx', name: 'Historial', id: 'proveedores/historial-proveedores' },
  
  // Usuarios
  { path: 'usuarios/UsuariosSistema.jsx', name: 'UsuariosSistema', id: 'usuarios/usuarios-sistema' },
  { path: 'usuarios/RolesPermisos.jsx', name: 'RolesPermisos', id: 'usuarios/roles-permisos' },
  
  // Configuracion
  { path: 'configuracion/DatosEmpresa.jsx', name: 'DatosEmpresa', id: 'configuracion/datos-empresa' },
  { path: 'configuracion/ConfiguracionFactura.jsx', name: 'ConfiguracionFactura', id: 'configuracion/config-factura' },
  { path: 'configuracion/MetodosPago.jsx', name: 'MetodosPago', id: 'configuracion/metodos-pago' },
  { path: 'configuracion/Notificaciones.jsx', name: 'Notificaciones', id: 'configuracion/notificaciones' },
];

pages.forEach(page => {
  const fullPath = path.join(srcDir, 'pages', page.path);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `import React from 'react';

const ${page.name} = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-up">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Módulo: ${page.path.split('/')[0]}</p>
          <h1 className="text-2xl font-extrabold text-white">${page.name}</h1>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center py-20 bg-surface-card rounded-2xl border border-white/[0.06]">
        <h2 className="text-xl font-bold text-gray-300 mb-2">${page.name} Component</h2>
        <p className="text-sm text-gray-500">Este es un archivo temporal en <code>src/pages/${page.path}</code></p>
      </div>
    </div>
  );
};

export default ${page.name};
`;

  fs.writeFileSync(fullPath, content);
});

// Update App.jsx routing automatically
let appContent = `import React, { useState, Suspense, lazy } from 'react';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import EquiposIngresados from './pages/reparaciones/EquiposIngresados';

// Lazy load scaffolded pages
`;

pages.forEach(page => {
  appContent += `const ${page.name} = lazy(() => import('./pages/${page.path.replace('.jsx', '')}'));\n`;
});

appContent += `\nexport default function App() {\n  const [activeMenu, setActiveMenu] = useState('dashboard');\n\n  const renderContent = () => {\n    switch (activeMenu) {\n      case 'dashboard': return <Dashboard />;\n      case 'reparaciones/equipos-ingresados': return <EquiposIngresados />;\n`;

pages.forEach(page => {
  appContent += `      case '${page.id}': return <${page.name} />;\n`;
});

appContent += `      default: return (\n        <div className="flex flex-col items-center justify-center h-full">\n          <p className="text-gray-400">Módulo no encontrado: {activeMenu}</p>\n        </div>\n      );\n    }\n  };\n\n  return (\n    <MainLayout activeMenu={activeMenu} setActiveMenu={setActiveMenu}>\n      <Suspense fallback={<div className="p-10 text-brand-blue flex items-center justify-center"><p className="animate-pulse font-semibold">Cargando módulo...</p></div>}>\n        {renderContent()}\n      </Suspense>\n    </MainLayout>\n  );\n}\n`;

fs.writeFileSync(path.join(srcDir, 'App.jsx'), appContent);

console.log('Scaffolding complete.');
