import { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import ConfirmDeleteModal from './components/ConfirmDeleteModal.jsx';
import ProductoDetailModal from './components/ProductoDetailModal.jsx';
import ProductoFormModal from './components/ProductoFormModal.jsx';
import InicioView from './views/inicioViews.jsx';
import ProductosView from './views/ProductosViews.jsx';
import CategoriaFormModal from './components/CategoriaFormModal.jsx';
import UsuarioFormModal from './components/UsuarioFormModal.jsx';

// Importación de las vistas
import GestionMenuViews from './views/GestionMenuViews.jsx';
import CategoriasViews from './views/CategoriasViews.jsx';
import UsuariosViews from './views/UsuariosViews.jsx';
import PedidosViews from './views/PedidosViews.jsx';
import DetallePedidoViews from './views/DetallePedidoViews.jsx';
import PagosViews from './views/PagosViews.jsx';


// Busca tu importación de categorías y agrégalas así:
// 1. Importación de Servicios de Categorías (Corregido)
import { 
  listarCategorias, 
  crearCategoria, 
  actualizarCategoria, 
  eliminarCategoria 
} from './services/categoriasApi.js';

// 2. Importación de Servicios de Usuarios (Sin las variables inactivas)
import { 
  listarUsuarios, 
  crearUsuario, 
  eliminarUsuario 
} from './services/usuarioApi.js';

// 3. Importación de Servicios de Productos, Pedidos, Detalles y Pagos (Punto corregido)
import {
  actualizarProducto,
  crearProducto,
  eliminarProducto,
  listarProductos,
  obtenerProducto
} from './services/productosApi.js';

import { listarPedidos } from './services/pedidosApi.js';
import { listarDetalles } from './services/detallesApi.js';
import { listarPagos } from './services/pagosApi.js';

function App() {
  const [activeView, setActiveView] = useState('inicio');

  // Estados reales para cada tabla de la Base de Datos
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]); 
  const [usuarios, setUsuarios] = useState([]); 
  const [pedidos, setPedidos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [pagos, setPagos] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [productoDetail, setProductoDetalle] = useState(null);
  const [productoEliminar, setProductoEliminar] = useState(null);
  const [formModal, setFormModal] = useState({ open: false, mode: 'create', data: null });

  // Estados para Categorías
const [categoriaModal, setCategoriaModal] = useState({ open: false, mode: 'create', data: null });


// Estados para Usuarios
const [usuarioModal, setUsuarioModal] = useState({ open: false, mode: 'create', data: null });


  // Funciones de carga desde el Backend
  const cargarUsuarios = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarUsuarios(); setUsuarios(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar usuarios.'); } finally { setLoading(false); }
  }, []);

  const cargarProductos = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarProductos(); setProductos(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar productos.'); } finally { setLoading(false); }
  }, []);

  const cargarCategorias = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarCategorias(); setCategorias(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar categorías.'); } finally { setLoading(false); }
  }, []);

  const cargarPedidos = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarPedidos(); setPedidos(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar pedidos.'); } finally { setLoading(false); }
  }, []);

  const cargarDetalles = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarDetalles(); setDetalles(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar detalles de pedidos.'); } finally { setLoading(false); }
  }, []);

  const cargarPagos = useCallback(async () => {
    try { setLoading(true); setError(''); const data = await listarPagos(); setPagos(data || []); } 
    catch (err) { setError(err.message || 'Error al consultar pagos.'); } finally { setLoading(false); }
  }, []);

 // Carga inicial completa de la aplicación optimizada para el linter
  useEffect(() => {
    const inicializarDatos = async () => {
      await cargarProductos();
      await cargarCategorias(); 
      await cargarUsuarios();
      await cargarPedidos();
      await cargarDetalles();
      await cargarPagos();
    };

    inicializarDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const promedioPrecio = useMemo(() => {
    if (productos.length === 0) return 0;
    const suma = productos.reduce((acc, p) => acc + Number(p.precio || 0), 0);
    return Number((suma / productos.length).toFixed(2));
  }, [productos]);

  const abrirModalCrear = () => { setFormModal({ open: true, mode: 'create', data: null }); setMessage(''); setError(''); };
  const abrirModalEditar = async (id) => {
    try { const producto = await obtenerProducto(id); setFormModal({ open: true, mode: 'edit', data: producto }); setMessage(''); setError(''); } 
    catch (err) { setError(err.message || 'No fue posible cargar el producto.'); }
  };
  const abrirModalDetalle = async (id) => {
    try { const producto = await obtenerProducto(id); setProductoDetalle(producto); setError(''); } 
    catch (err) { setError(err.message || 'No fue posible obtener el detalle.'); }
  };
  const abrirModalEliminar = (id) => { const encontrado = productos.find((p) => p.id === id); if (encontrado) setProductoEliminar(encontrado); };

  const guardarProducto = async (data) => {

  const producto = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    precio: Number(data.precio),
    stock: Number(data.stock),
    categoria: {
      idCategoria: Number(data.categoria)
    }
  };

  try {

    if (formModal.mode === 'create') {
      await crearProducto(producto);
      setMessage('Producto guardado correctamente.');
    } else {
      await actualizarProducto(formModal.data.id, producto);
      setMessage('Producto actualizado correctamente.');
    }

    setFormModal({
      open: false,
      mode: 'create',
      data: null
    });

    await cargarProductos();

  } catch (err) {
    setError(err.message || 'No fue posible guardar el producto.');
  }
};

  const confirmarEliminar = async (id) => {
    try { await eliminarProducto(id); setProductoEliminar(null); setMessage('Producto eliminado correctamente.'); await cargarProductos(); } 
    catch (err) { setError(err.message || 'No fue posible eliminar el producto.'); }
  };


// ==========================================
// ACCIONES PARA CATEGORÍAS
// ==========================================
const abrirModalCrearCategoria = () => setCategoriaModal({ open: true, mode: 'create', data: null });

const abrirModalEditarCategoria = (idCategoria) => {
  const encontrada = categorias.find(c => c.idCategoria === idCategoria);
  if (encontrada) setCategoriaModal({ open: true, mode: 'edit', data: encontrada });
};

const guardarCategoria = async (formData) => {
  try {
    if (categoriaModal.mode === 'create') {
      // Si tu servicio aún no está importado, añádelo arriba: import { crearCategoria, actualizarCategoria, eliminarCategoria } from './services/categoriasApi.js';
      await crearCategoria(formData); 
      setMessage('Categoría creada con éxito.');
    } else {
      await actualizarCategoria(categoriaModal.data.idCategoria, formData);
      setMessage('Categoría actualizada con éxito.');
    }
    setCategoriaModal({ open: false, mode: 'create', data: null });
    await cargarCategorias();
  } catch (err) {
    setError(err.message || 'Error al guardar la categoría.');
  }
};

const manejarEliminarCategoria = async (idCategoria) => {
  if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
    try {
      await eliminarCategoria(idCategoria);
      setMessage('Categoría eliminada con éxito.');
      await cargarCategorias();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar la categoría.');
    }
  }
};

// ==========================================
// ACCIONES PARA USUARIOS
// ==========================================
const abrirModalCrearUsuario = () => setUsuarioModal({ open: true, mode: 'create', data: null });

const abrirModalVerUsuario = (idUsuario) => {
  const encontrado = usuarios.find(u => u.idUsuario === idUsuario);
  if (encontrado) setUsuarioModal({ open: true, mode: 'view', data: encontrado });
};

const guardarUsuario = async (formData) => {
  try {
    if (usuarioModal.mode === 'create') {
      // Si tu servicio aún no está importado, añádelo arriba: import { crearUsuario, eliminarUsuario } from './services/usuarioApi.js';
      await crearUsuario(formData);
      setMessage('Usuario registrado con éxito.');
    }
    setUsuarioModal({ open: false, mode: 'create', data: null });
    await cargarUsuarios();
  } catch (err) {
    setError(err.message || 'Error al guardar el usuario.');
  }
};

const manejarEliminarUsuario = async (idUsuario) => {
  if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
    try {
      await eliminarUsuario(idUsuario);
      setMessage('Usuario eliminado con éxito.');
      await cargarUsuarios();
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el usuario.');
    }
  }
};



  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="header-title">
    <h1>Inventario Tienda Vive</h1>
    <p>Frontend React conectado al CRUD del backend Spring.</p>
  </div>
        <nav className="menu">
          <button type="button" className={`btn ${activeView === 'inicio' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveView('inicio')}>Inicio</button>
          <button type="button" className={`btn ${activeView !== 'inicio' ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setActiveView('menu-gestion')}>Gestión</button>
        </nav>
      </header>

      <main className="content">
        {message && <p className="message success">{message}</p>}
        {error && <p className="message error">{error}</p>}

        {activeView === 'inicio' && (
          <InicioView totalProductos={productos.length} promedioPrecio={promedioPrecio} onIrGestion={() => setActiveView('menu-gestion')} onNuevo={abrirModalCrear} />
        )}

        {activeView === 'menu-gestion' && (
          <GestionMenuViews onSeleccionarVista={(idVista) => setActiveView(idVista)} />
        )}

        {activeView === 'productos' && (
          <ProductosView productos={productos} loading={loading} onReload={cargarProductos} onNuevo={abrirModalCrear} onVer={abrirModalDetalle} onEditar={abrirModalEditar} onEliminar={abrirModalEliminar} onVolver={() => setActiveView('menu-gestion')} />
        )}

     {activeView === 'categorias' && (
  <CategoriasViews 
    categorias={categorias} 
    loading={loading} 
    onReload={cargarCategorias} 
    onNuevo={abrirModalCrearCategoria} 
    onEditar={abrirModalEditarCategoria} 
    onEliminar={manejarEliminarCategoria} 
    onVolver={() => setActiveView('menu-gestion')} 
  />
)}

{activeView === 'usuarios' && (
  <UsuariosViews 
    usuarios={usuarios} 
    loading={loading} 
    onReload={cargarUsuarios} 
    onNuevo={abrirModalCrearUsuario} 
    onVer={abrirModalVerUsuario} 
    onEliminar={manejarEliminarUsuario} 
    onVolver={() => setActiveView('menu-gestion')} 
  />
)}

        {activeView === 'pedidos' && (
          <PedidosViews pedidos={pedidos} loading={loading} onReload={cargarPedidos} onNuevo={() => {}} onVerDetalle={() => {}} onCambiarEstado={() => {}} onVolver={() => setActiveView('menu-gestion')} />
        )}

        {activeView === 'detalles' && (
          <DetallePedidoViews detalles={detalles} loading={loading} onVolver={() => setActiveView('menu-gestion')} />
        )}

        {activeView === 'pagos' && (
          <PagosViews pagos={pagos} loading={loading} onReload={cargarPagos} onRegistrarPago={() => {}} onVolver={() => setActiveView('menu-gestion')} />
        )}
      </main>

      {formModal.open && <ProductoFormModal mode={formModal.mode} initialData={formModal.data} onSave={guardarProducto} onClose={() => setFormModal({ open: false, mode: 'create', data: null })} />}
      {productoDetail && <ProductoDetailModal producto={productoDetail} onClose={() => setProductoDetalle(null)} />}
      {productoEliminar && <ConfirmDeleteModal producto={productoEliminar} onConfirm={confirmarEliminar} onClose={() => setProductoEliminar(null)} />}
    
    {categoriaModal.open && (
      <CategoriaFormModal 
        mode={categoriaModal.mode} 
        initialData={categoriaModal.data} 
        onSave={guardarCategoria} 
        onClose={() => setCategoriaModal({ open: false, mode: 'create', data: null })} 
      />
    )}

    {usuarioModal.open && (
      <UsuarioFormModal 
        mode={usuarioModal.mode} 
        initialData={usuarioModal.data} 
        onSave={guardarUsuario} 
        onClose={() => setUsuarioModal({ open: false, mode: 'create', data: null })} 
      />
    )}

  </div>

  );
}

export default App;