// URL base del backend Spring que expone el CRUD de productos.
const API_URL = 'http://localhost:8080/api/productos';

// Convierte la respuesta HTTP en JSON y estandariza el error para mostrarlo en UI.
async function parseResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la comunicacion con el backend.');
  }

  // DELETE responde 204 (sin contenido), por eso devolvemos null.
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export async function listarProductos() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}

export async function obtenerProducto(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return parseResponse(response);
}

export async function crearProducto(data) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function actualizarProducto(id, data) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  return parseResponse(response);
}

export async function eliminarProducto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });

  return parseResponse(response);
}
