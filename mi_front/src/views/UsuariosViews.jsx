// src/views/UsuariosViews.jsx

function UsuariosViews({ usuarios, loading, onReload, onNuevo, onEditar, onEliminar, onVolver }) {
  return (
    <section className="panel">
      <div className="panel-header">
        <div>
          <h2>Gestión de Usuarios</h2>
          <p>Administra las cuentas de clientes, administradores y personal del sistema.</p>
        </div>
        <div className="toolbar">
          <button type="button" className="btn btn-ghost" onClick={onVolver}>
            Volver
          </button>
          <button type="button" className="btn btn-secondary" onClick={onReload}>
            Recargar
          </button>
          <button type="button" className="btn btn-primary" onClick={onNuevo}>
            Nuevo Usuario
          </button>
        </div>
      </div>

      {loading ? (
        <p>Cargando lista de usuarios...</p>
      ) : usuarios.length === 0 ? (
        <p>No hay usuarios registrados todavía en Tienda Vive.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha de Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usr) => (
                // Usamos idUsuario que es la clave primaria exacta de tu entidad
                <tr key={usr.idUsuario}>
                  <td># {usr.idUsuario}</td>
                  <td>{usr.nombre}</td>
                  <td>{usr.email}</td>
                  <td>{usr.telefono || "—"}</td>
                  <td>{usr.direccion || "—"}</td>
                  <td>
                    {usr.fechaRegistro 
                      ? new Date(usr.fechaRegistro).toLocaleDateString('es-CO') 
                      : "—"}
                  </td>
                  <td>
                    <span className={`badge status-${usr.estado?.toLowerCase() || 'activo'}`}>
                      {usr.estado || "Activo"}
                    </span>
                  </td>
                  <td className="actions-cell">
                    <button 
                      type="button" 
                      className="btn btn-secondary" 
                      onClick={() => onEditar(usr.idUsuario)}
                    >
                      Editar
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-danger" 
                      onClick={() => onEliminar(usr.idUsuario)}
                    >
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

export default UsuariosViews;