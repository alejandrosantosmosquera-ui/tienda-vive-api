import Modal from './Modal';

function ConfirmDeleteModal({ producto, onConfirm, onClose }) {
  if (!producto) return null;

  return (
    <Modal title="Confirmar eliminacion" onClose={onClose}>
      <div className="modal-body">
        <p>
          Vas a eliminar <strong>{producto.nombre}</strong>. Esta accion no se puede deshacer.
        </p>
        <div className="form-actions">
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className="btn btn-danger" onClick={() => onConfirm(producto.id)}>
            Eliminar
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default ConfirmDeleteModal;