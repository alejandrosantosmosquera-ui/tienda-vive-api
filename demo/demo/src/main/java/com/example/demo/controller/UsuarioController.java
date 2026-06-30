package com.example.demo.controller;

import com.example.demo.entity.Usuario;
import com.example.demo.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity; // <-- IMPORTANTE: Agregar este import
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping
    public List<Usuario> listarTodos() {
        return usuarioService.obtenerTodos();
    }

    @PostMapping
    public Usuario guardar(@RequestBody Usuario usuario) {
        return usuarioService.guardarUsuario(usuario);
    }

    // El método de eliminación corregido y funcional:
    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable Long id) {
        try {
            // 1. Llama a tu servicio para borrar de MySQL usando el ID recibido
            usuarioService.eliminarUsuario(id);

            // 2. Retorna un estado 204 No Content (justo lo que tu frontend parseResponse espera)
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            // En caso de que ocurra un error (ej. el ID no existe), devuelve un error 500
            return ResponseEntity.internalServerError().body("Error al eliminar el usuario: " + e.getMessage());
        }
    }
}