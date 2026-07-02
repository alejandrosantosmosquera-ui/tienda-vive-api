// src/views/GestionMenuViews.jsx
function GestionMenuViews({ onSeleccionarVista }) {
  const modulos = [
    { id: 'productos', nombre: 'Productos', desc: 'Gestionar stock, precios y descripciones.' },
    { id: 'categorias', nombre: 'Categorías', desc: 'Organizar familias y grupos de productos.' },
    { id: 'usuarios', nombre: 'Usuarios', desc: 'Administrar clientes, cuentas y datos de contacto.' },
    { id: 'pedidos', nombre: 'Pedidos', desc: 'Monitorear órdenes de compra y estados.' },
    { id: 'detalles', nombre: 'Detalles de Pedidos', desc: 'Ver el desglose de artículos por orden.' },
    { id: 'pagos', nombre: 'Control de Pagos', desc: 'Historial financiero y estados de facturas.' }
  ];

  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Módulos de Gestión</h2>
          <p>Selecciona la tabla o proceso de la base de datos que deseas administrar:</p>
        </div>
      </div>

      <div className="stats-grid" style={{ marginTop: '20px' }}>
        {modulos.map((modulo) => (
          <article 
            key={modulo.id} 
            className="stat-card" 
            style={{ cursor: 'pointer', transition: '0.2s' }}
            onClick={() => onSeleccionarVista(modulo.id)}
          >
            <span style={{ fontSize: '1.2rem', color: '#1d4ed8', fontWeight: 'bold' }}>
              {modulo.nombre}
            </span>
            <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px', fontWeight: 'normal' }}>
              {modulo.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default GestionMenuViews;