import { useState, useEffect } from 'react';

function UsuarioFormModal({ mode, initialData, onSave, onClose }) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDirección] = useState('');

  useEffect(() => {
    if (initialData) {
      setNombre(initialData.nombre || '');
      setEmail(initialData.email || '');
      setPassword('');
      setTelefono(initialData.telefono || '');
      setDirección(initialData.direccion || '');
    } else {
      setNombre('');
      setEmail('');
      setPassword('');
      setTelefono('');
      setDirección('');
    }
  }, [initialData, mode]);

  const manejarEnvio = (e) => {
    e.preventDefault();
    
    const usuarioData = {
      nombre,
      email,
      telefono,
      direccion,
      estado: 'ACTIVO'
    };

    if (password) {
      usuarioData.password = password;
    }

    onSave(usuarioData);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-header">
          <h3>{mode === 'create' ? 'Nuevo Usuario' : 'Detalles del Usuario'}</h3>
          <button type="button" className="btn btn-ghost" onClick={onClose}>×</button>
        </div>

        <form onSubmit={manejarEnvio}>
          <div className="modal-body">
            
            {/* Nombre Completo */}
            <div>
              <label className="field-label">Nombre Completo</label>
              <input 
                type="text" 
                className="field-input"
                value={nombre} 
                onChange={(e) => setNombre(e.target.value)} 
                required 
                disabled={mode === 'view'}
              />
            </div>

            {/* Correo Electrónico */}
            <div>
              <label className="field-label">Correo Electrónico</label>
              <input 
                type="email" 
                className="field-input"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                disabled={mode === 'view'}
              />
            </div>

            {/* Contraseña - Solo aparece al crear */}
            {mode === 'create' ? (
              <div>
                <label className="field-label">Contraseña</label>
                <input 
                  type="password" 
                  className="field-input"
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="Mínimo 6 caracteres"
                />
              </div>
            ) : (
              <div>
                <label className="field-label">Estado de Cuenta</label>
                <input 
                  type="text" 
                  className="field-input"
                  value={initialData?.estado || 'ACTIVO'} 
                  disabled
                />
              </div>
            )}

            {/* Teléfono */}
            <div>
              <label className="field-label">Teléfono</label>
              <input 
                type="text" 
                className="field-input"
                value={telefono} 
                onChange={(e) => setTelefono(e.target.value)} 
                required 
                disabled={mode === 'view'}
                placeholder="Ej: 3101234567"
              />
            </div>

            {/* Dirección - Ocupa las dos columnas de la cuadrícula */}
            <div className="full-width">
              <label className="field-label">Dirección de Residencia</label>
              <input 
                type="text" 
                className="field-input"
                value={direccion} 
                onChange={(e) => setDirección(e.target.value)} 
                required 
                disabled={mode === 'view'}
                placeholder="Ej: Calle 5 #10-25"
              />
            </div>

            {/* Acciones del Formulario */}
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                {mode === 'view' ? 'Cerrar' : 'Cancelar'}
              </button>
              {mode !== 'view' && (
                <button type="submit" className="btn btn-primary">
                  Guardar Usuario
                </button>
              )}
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default UsuarioFormModal;