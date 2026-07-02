// src/services/pedidosApi.js
const API_URL = 'http://localhost:8080/api/pedidos';

async function parseResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Error en la comunicación con el backend.');
  }
  return response.json();
}

// GET para listar (este es el que se ejecuta al iniciar la app)
export async function listarPedidos() {
  const response = await fetch(API_URL);
  return parseResponse(response);
}

// POST para crear un pedido adaptado a los @RequestParam de tu Spring Boot
export async function crearPedido(pedidoData, idProducto, cantidad) {
  const response = await fetch(`${API_URL}?idProducto=${idProducto}&cantidad=${cantidad}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pedidoData),
  });
  return parseResponse(response);
}