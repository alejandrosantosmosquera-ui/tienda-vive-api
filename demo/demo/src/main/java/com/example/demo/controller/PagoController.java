package com.example.demo.controller;

import com.example.demo.entity.Pago;
import com.example.demo.service.PagoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/pagos")
@CrossOrigin(origins = "http://localhost:5173")
public class PagoController {

    @Autowired
    private PagoService pagoService;

    @GetMapping
    public List<Pago> listarTodos() {
        return pagoService.obtenerTodos();
    }

    @PostMapping
    public Pago guardar(@RequestBody Pago pago) {
        return pagoService.guardarPago(pago);
    }
}