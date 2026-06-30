package com.example.demo.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Categoria;
import com.example.demo.service.CategoriaService;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

    private final CategoriaService service;

    public CategoriaController(CategoriaService service) {
        this.service = service;
    }

    // Obtener todas las categorías
    @GetMapping
    public List<Categoria> listar() {
        return service.listar();
    }

    // Buscar una categoría por ID
    @GetMapping("/{id}")
    public ResponseEntity<Categoria> buscar(@PathVariable Long id) {

        Optional<Categoria> categoria = service.buscarPorId(id);

        return categoria
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear categoría
    @PostMapping
    public Categoria guardar(@RequestBody Categoria categoria) {
        return service.guardar(categoria);
    }

    // Actualizar categoría
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> actualizar(
            @PathVariable Long id,
            @RequestBody Categoria categoria) {

        Categoria actualizada = service.actualizar(id, categoria);

        if (actualizada == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(actualizada);
    }

    // Eliminar categoría
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {

        service.eliminar(id);

        return ResponseEntity.noContent().build();
    }
}