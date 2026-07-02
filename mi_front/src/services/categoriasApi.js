// URL base del backend Spring que expone el CRUD de categorías.
const API_URL = 'http://localhost:8080/api/categorias';

async function parseResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la comunicación con el backend.');
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

// 1. LISTAR CATEGORÍAS (GET)
export async function listarCategorias() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}

// 2. CREAR CATEGORÍA (POST)
export async function crearCategoria(categoriaData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaData),
  });
  return parseResponse(response);
}

// 3. ACTUALIZAR CATEGORÍA (PUT)
export async function actualizarCategoria(idCategoria, categoriaData) {
  const response = await fetch(`${API_URL}/${idCategoria}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoriaData),
  });
  return parseResponse(response);
}

// 4. ELIMINAR CATEGORÍA (DELETE)
export async function eliminarCategoria(idCategoria) {
  const response = await fetch(`${API_URL}/${idCategoria}`, {
    method: 'DELETE',
  });
  return parseResponse(response);
}