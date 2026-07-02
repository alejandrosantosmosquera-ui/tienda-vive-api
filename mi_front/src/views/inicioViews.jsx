function InicioView({ totalProductos, promedioPrecio, onIrGestion, onNuevo }) {
  return (
    <section className="panel">
      <h2>Panel de inventario</h2>
      <p>
        Esta vista resume el estado del inventario.
      </p>

      <div className="stats-grid">
        <article className="stat-card">
          <span>Total productos</span>
          <strong>{totalProductos}</strong>
        </article>
        <article className="stat-card">
          <span>Precio promedio</span>
          <strong>${promedioPrecio.toLocaleString('es-CO')}</strong>
        </article>
      </div>

      <div className="toolbar">
        <button type="button" className="btn btn-primary" onClick={onNuevo}>
          Nuevo producto
        </button>
        <button type="button" className="btn btn-secondary" onClick={onIrGestion}>
          Ir a gestion
        </button>
      </div>
    </section>
  );
}

export default InicioView;