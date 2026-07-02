// src/views/DetallePedidoViews.jsx

function DetallePedidoViews({ detalles, loading, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Detalles de Pedidos</h2>
          <p>Revisa el desglose de artículos, cantidades y subtotales por cada orden.</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={onVolver}>
            Volver
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando detalles de los productos...</p>
      ) : detalles.length === 0 ? (
        <p>No hay artículos desglosados en el sistema todavía.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID Detalle</th>
                <th>ID Pedido</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {detalles.map((det) => (
                // Usamos idDetalle como clave única de la fila
                <tr key={det.idDetalle}>
                  <td># {det.idDetalle}</td>
                  <td># {det.pedido?.idPedido || "—"}</td>
                  <td>
                    {det.producto ? (
                      <strong>{det.producto.nombre}</strong>
                    ) : (
                      <span style={{ color: '#999' }}>Producto no identificado</span>
                    )}
                  </td>
                  <td>{det.cantidad}</td>
                  <td>${Number(det.precioUnitario || 0).toLocaleString('es-CO')}</td>
                  <td>
                    <strong>
                      ${Number((det.cantidad * (det.precioUnitario || 0))).toLocaleString('es-CO')}
                    </strong>
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

export default DetallePedidoViews;