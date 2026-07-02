function CategoriasViews({ categorias, loading, onReload, onNuevo, onEditar, onEliminar, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Gestión de Categorías</h2>
          <p>Organiza los productos del sistema mediante grupos y familias.</p>
        </div>
        <div className="toolbar">
          {/* BOTÓN PARA VOLVER A MÓDULOS DE GESTIÓN */}
          <button type="button" className="btn btn-ghost" onClick={onVolver}>
            Volver
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReload}>
            Recargar
          </button>
          <button type="button" className="btn btn-primary" onClick={onNuevo}>
            Nuevo
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <p>No hay categorías registradas todavía.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categorias.map((cat) => (
                <tr key={cat.idCategoria}>
                  <td>{cat.idCategoria}</td>
                  <td>{cat.nombre}</td>
                  <td className="actions-cell">
                    <button type="button" className="btn btn-secondary" onClick={() => onEditar(cat.idCategoria)}>
                      Editar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => onEliminar(cat.idCategoria)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
export default CategoriasViews;