function ProductosViews({ productos, loading, onReload, onNuevo, onVer, onEditar, onEliminar, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Gestion de productos</h2>
          <p>Consulta, crea, actualiza y elimina registros usando modales.</p>
        </div>
        <div className="toolbar">
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
      {/* ... Resto de tu tabla de productos intacta ... */}

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No hay productos registrados todavia.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  {/* Muestra la descripción o un texto alternativo si está vacía */}
                  <td>{producto.descripcion || "Sin descripción"}</td>
                  <td>${Number(producto.precio).toLocaleString('es-CO')}</td>
                  {/* Muestra el stock con la abreviatura 'uds' (unidades) */}
                  <td>{producto.stock ?? 0} uds</td>
                  {/* Accede de forma segura al nombre de la categoría del objeto embebido */}
                  <td>{producto.categoria?.nombre || "Sin categoría"}</td>
                  <td className="actions-cell">
                    <button type="button" className="btn btn-ghost" onClick={() => onVer(producto.id)}>
                      Ver
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={() => onEditar(producto.id)}>
                      Editar
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => onEliminar(producto.id)}>
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

export default ProductosViews;