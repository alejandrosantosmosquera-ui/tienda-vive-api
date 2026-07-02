// src/services/usuarioApi.js

// URL base del backend Spring que expone el CRUD de usuarios.
const API_URL = 'http://localhost:8080/api/usuarios';

// Convierte la respuesta HTTP en JSON y estandariza el error para mostrarlo en la UI.
async function parseResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la comunicación con el backend.');
  }

  // Si el servidor responde con 204 (No Content), por ejemplo al eliminar, devolvemos null.
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

// 1. Obtener todos los usuarios (GET)
export async function listarUsuarios() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}

// 2. Obtener un usuario por su ID (GET)
export async function obtenerUsuario(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return parseResponse(response);
}

// 3. Crear un nuevo usuario (POST)
export async function crearUsuario(usuarioData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioData),
  });
  return parseResponse(response);
}

// 4. Actualizar un usuario existente (PUT)
export async function actualizarUsuario(id, usuarioData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuarioData),
  });
  return parseResponse(response);
}

// 5. Eliminar un usuario (DELETE)
export async function eliminarUsuario(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return parseResponse(response);
}