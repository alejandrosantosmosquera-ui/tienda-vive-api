function Modal({ title, children, onClose }) {
  // Cierra el modal al hacer clic sobre el fondo oscuro.
  const handleBackdropClick = (event) => {
    if (event.target.className === 'modal-backdrop') {
      onClose();
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick} role="presentation">
      <div className="modal-card" role="dialog" aria-modal="true" aria-label={title}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="btn btn-ghost" onClick={onClose} type="button">
            Cerrar
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;