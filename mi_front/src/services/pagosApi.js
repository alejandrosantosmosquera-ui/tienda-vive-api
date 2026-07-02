const API_URL = 'http://localhost:8080/api/pagos';

async function parseResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la comunicación con el backend.');
  }
  return response.json();
}

export async function listarPagos() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}