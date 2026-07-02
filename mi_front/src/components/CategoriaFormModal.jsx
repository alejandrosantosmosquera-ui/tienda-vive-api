import { useState } from "react";

function CategoriaFormModal({ mode, initialData, onSave, onClose }) {
  // Inicializamos el estado directamente con los datos si existen (evita alertas de ESLint)
  const [nombre, setNombre] = useState(initialData ? (initialData.nombre || "") : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviamos el objeto con la estructura que espera tu backend
    onSave({ nombre });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{mode === "create" ? "Nueva Categoría" : "Editar Categoría"}</h3>
          <button type="button" className="btn btn-ghost" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div>
              <label className="field-label">Nombre de la Categoría</label>
              <input
                className="field-input"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Tecnología, Hogar..."
                required
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {mode === "create" ? "Guardar Categoría" : "Actualizar Categoría"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoriaFormModal;