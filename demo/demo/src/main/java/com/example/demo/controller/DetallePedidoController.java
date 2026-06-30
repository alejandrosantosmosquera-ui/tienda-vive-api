package com.example.demo.controller;

import com.example.demo.entity.DetallePedido;
import com.example.demo.service.DetallePedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/detalles")
@CrossOrigin(origins = "http://localhost:5173")
public class DetallePedidoController {

    @Autowired
    private DetallePedidoService detallePedidoService;

    @GetMapping
    public List<DetallePedido> listarTodos() {
        return detallePedidoService.obtenerTodos();
    }

    @PostMapping
    public DetallePedido guardar(@RequestBody DetallePedido detallePedido) {
        return detallePedidoService.guardarDetalle(detallePedido);
    }
}