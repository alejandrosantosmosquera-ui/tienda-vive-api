package com.example.demo.service;

import com.example.demo.entity.Pedido;
import com.example.demo.entity.Usuario;
import com.example.demo.entity.Producto;
import com.example.demo.repository.PedidoRepository;
import com.example.demo.repository.UsuarioRepository;
import com.example.demo.repository.ProductoRepository; // <-- Necesitamos interactuar con Productos
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional; // El Salvador de la consistencia de datos
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ProductoRepository productoRepository; // <-- Inyectamos el repositorio de productos

    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }

    @Transactional // Si algo falla (ej. no hay stock), se cancela TODO en la BD (Rollback)
    public Pedido guardarPedido(Pedido pedido, Long idProducto, Integer cantidadComprada) {

        // 1. Buscamos el producto en la base de datos para validar stock
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Error: El producto con ID " + idProducto + " no existe."));

        // 2. REGLA DE NEGOCIO: Validar si hay stock disponible
        if (producto.getStock() < cantidadComprada) {
            throw new RuntimeException("No hay suficiente stock para el producto: " + producto.getNombre()
                    + ". Stock disponible: " + producto.getStock());
        }

        // 3. RESTAR EL STOCK: Modificamos el stock del producto en memoria y lo guardamos
        producto.setStock(producto.getStock() - cantidadComprada);
        productoRepository.saveAndFlush(producto);// Se actualiza el nuevo stock en MySQL

        // 4. Completar datos del pedido antes de guardar
        if (pedido.getFecha() == null) {
            pedido.setFecha(LocalDateTime.now());
        }

        // Cargar usuario completo para la respuesta JSON (lo que arreglamos antes)
        if (pedido.getUsuario() != null && pedido.getUsuario().getIdUsuario() != null) {
            Usuario usuarioCompleto = usuarioRepository.findById(pedido.getUsuario().getIdUsuario()).orElse(null);
            pedido.setUsuario(usuarioCompleto);
        }

        // 5. Guardar el pedido final en la BD
        return pedidoRepository.save(pedido);
    }
}