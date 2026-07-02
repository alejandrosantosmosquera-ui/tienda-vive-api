import { useState, useEffect } from "react";
import { listarCategorias } from "../services/categoriasApi";

function ProductoFormModal({ mode, initialData, onSave, onClose }) {
  // Inicialización directa en el estado para evitar alertas de efectos síncronos
  const [form, setForm] = useState({
    nombre: initialData?.nombre || "",
    descripcion: initialData?.descripcion || "",
    categoria: initialData?.categoria?.idCategoria || "", 
    precio: initialData?.precio || "",
    stock: initialData?.stock || ""
  });
  const [categorias, setCategorias] = useState([]);

  // Conservamos únicamente este efecto para consumir los datos de la API al montar el componente
  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const data = await listarCategorias();
        setCategorias(data || []);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };

    cargarCategorias();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">

        <div className="modal-header">
          <h3>
            {mode === "create" ? "Nuevo Producto" : "Editar Producto"}
          </h3>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* Nombre */}
            <div>
              <label className="field-label">Nombre</label>
              <input
                className="field-input"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Nombre del producto"
                required
              />
            </div>

            {/* Categoría */}
            <div>
              <label className="field-label">Categoría</label>
              <select
                className="field-input"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                {categorias.map((categoria) => (
                  <option
                    key={categoria.idCategoria}
                    value={categoria.idCategoria}
                  >
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Descripción */}
            <div className="full-width">
              <label className="field-label">Descripción</label>
              <textarea
                className="field-input"
                rows="4"
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                placeholder="Descripción del producto"
              />
            </div>

            {/* Precio */}
            <div>
              <label className="field-label">Precio</label>
              <input
                className="field-input"
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="$ 0"
                required
              />
            </div>

            {/* Stock */}
            <div>
              <label className="field-label">Stock</label>
              <input
                className="field-input"
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
                required
              />
            </div>

            {/* Botones */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {mode === "create" ? "Guardar Producto" : "Actualizar Producto"}
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
}

export default ProductoFormModal;