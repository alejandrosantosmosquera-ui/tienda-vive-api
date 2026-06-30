package com.example.demo.controller;

import com.example.demo.entity.Pedido;
import com.example.demo.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "http://localhost:5173")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @GetMapping
    public List<Pedido> listarTodos() {
        return pedidoService.obtenerTodos();
    }

    @PostMapping
    public Pedido guardar(
            @RequestBody Pedido pedido,
            @RequestParam Long idProducto,    // <-- Recibe el ID del producto por URL
            @RequestParam Integer cantidad     // <-- Recibe la cantidad por URL
    ) {
        return pedidoService.guardarPedido(pedido, idProducto, cantidad);
    }
}