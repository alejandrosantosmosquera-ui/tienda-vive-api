import Modal from './Modal'; // O como se llame tu componente base de modales

function ProductoDetailModal({ producto, onClose }) {
  if (!producto) return null;

  return (
    <Modal title="Detalle del Producto" onClose={onClose}>
      <div className="modal-body">
        <p><strong>ID:</strong> {producto.id}</p>
        <p><strong>Nombre:</strong> {producto.nombre}</p>
        <p><strong>Descripción:</strong> {producto.descripcion || 'Sin descripción'}</p>
        <p><strong>Precio:</strong> ${Number(producto.precio).toLocaleString('es-CO')}</p>
        <p><strong>Stock:</strong> {producto.stock ?? 0} unidades</p>
        <p><strong>Categoría:</strong> {producto.categoria?.nombre || 'Sin categoría'}</p>
        
        <div className="form-actions" style={{ marginTop: '20px' }}>
          <button type="button" className="btn btn-primary" onClick={onClose}>
            Cerrar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ProductoDetailModal;