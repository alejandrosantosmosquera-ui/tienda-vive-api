// src/views/PagosViews.jsx

function PagosViews({ pagos, loading, onReload, onRegistrarPago, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Control de Pagos</h2>
          <p>Historial financiero, comprobantes y estados de facturas.</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={onVolver}>
            Volver
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReload}>
            Recargar
          </button>
          <button type="button" className="btn btn-primary" onClick={onRegistrarPago}>
            Registrar Pago
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando registros de pago...</p>
      ) : pagos.length === 0 ? (
        <p>No se registran movimientos de caja o pagos todavía.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID Pago</th>
                <th>ID Pedido</th>
                <th>Fecha Pago</th>
                <th>Método de Pago</th>
                <th>Monto Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {pagos.map((pago) => (
                <tr key={pago.idPago}>
                  <td># {pago.idPago}</td>
                  {/* Accede de forma segura al ID del Pedido maestro */}
                  <td>
                    {pago.pedido?.idPedido ? `# ${pago.pedido.idPedido}` : "Sin orden asociada"}
                  </td>
                  {/* Sincronizado con 'pago.fecha' de tu backend */}
                  <td>
                    {pago.fecha 
                      ? new Date(pago.fecha).toLocaleString('es-CO') 
                      : "—"}
                  </td>
                  <td>{pago.metodoPago || "Efectivo"}</td>
                  {/* Para el monto, usamos el total del pedido asociado para saber cuánto se pagó */}
                  <td>
                    <strong>
                      ${pago.pedido?.total 
                        ? Number(pago.pedido.total).toLocaleString('es-CO') 
                        : "0"}
                    </strong>
                  </td>
                  <td>
                    <span className={`badge status-${pago.estado?.toLowerCase() || 'completado'}`}>
                      {pago.estado || "Completado"}
                    </span>
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

export default PagosViews;