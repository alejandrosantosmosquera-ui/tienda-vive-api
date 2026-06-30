package com.example.demo.service;

import com.example.demo.entity.Usuario;
import com.example.demo.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<Usuario> obtenerTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario guardarUsuario(Usuario usuario) {
        // Aquí metemos lógica de negocio antes de tocar la BD:
        if (usuario.getFechaRegistro() == null) {
            usuario.setFechaRegistro(LocalDateTime.now());
        }
        if (usuario.getEstado() == null) {
            usuario.setEstado("ACTIVO"); // Estado por defecto
        }
        return usuarioRepository.save(usuario);
    }
    public void eliminarUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }
}