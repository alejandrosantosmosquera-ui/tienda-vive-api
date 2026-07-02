// src/views/PedidosViews.jsx

function PedidosViews({ pedidos, loading, onReload, onNuevo, onVerDetalle, onCambiarEstado, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Órdenes y Pedidos</h2>
          <p>Monitorea las solicitudes de compra generadas por los usuarios.</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={onVolver}>Volver</button>
          <button type="button" className="btn btn-secondary" onClick={onReload}>Recargar</button>
          <button type="button" className="btn btn-primary" onClick={onNuevo}>Crear Pedido</button>
        </div>
      </div>

      {loading ? (
        <p>Cargando órdenes...</p>
      ) : pedidos.length === 0 ? (
        <p>No se registran órdenes de compra en el sistema.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>Fecha</th>
                <th>Cliente / Usuario</th>
                <th>Total Venta</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.idPedido}>
                  <td># {pedido.idPedido}</td>
                  <td>
                    {pedido.fecha 
                      ? new Date(pedido.fecha).toLocaleString('es-CO') 
                      : "—"}
                  </td>
                  {/* Leemos el objeto 'usuario' que viene de tu relación @ManyToOne de Spring Boot */}
                  <td>
                    {pedido.usuario ? (
                      <div>
                        <strong>{pedido.usuario.nombre}</strong>
                        <br />
                        <small style={{ color: '#666' }}>{pedido.usuario.email}</small>
                      </div>
                    ) : (
                      <span style={{ color: '#999' }}>Sin usuario asignado</span>
                    )}
                  </td>
                  <td>
                    <strong>
                      ${Number(pedido.total || 0).toLocaleString('es-CO')}
                    </strong>
                  </td>
                  <td>
                    <span className={`badge order-${pedido.estado?.toLowerCase() || 'pendiente'}`}>
                      {pedido.estado || "Pendiente"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      type="button" 
                      className="btn btn-ghost" 
                      onClick={() => onVerDetalle(pedido.idPedido)}
                    >
                      Ver ítems
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => onCambiarEstado(pedido.idPedido)}
                    >
                      Estado
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

export default PedidosViews;