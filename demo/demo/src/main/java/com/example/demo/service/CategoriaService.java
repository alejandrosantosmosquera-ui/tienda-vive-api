package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entity.Categoria;
import com.example.demo.repository.CategoriaRepository;

@Service
public class CategoriaService {

    private final CategoriaRepository repository;

    public CategoriaService(CategoriaRepository repository) {
        this.repository = repository;
    }

    // Listar todas las categorías
    public List<Categoria> listar() {
        return repository.findAll();
    }

    // Buscar por ID
    public Optional<Categoria> buscarPorId(Long id) {
        return repository.findById(id);
    }

    // Guardar
    public Categoria guardar(Categoria categoria) {
        return repository.save(categoria);
    }

    // Actualizar
    public Categoria actualizar(Long id, Categoria categoria) {

        return repository.findById(id)
                .map(cat -> {
                    cat.setNombre(categoria.getNombre());
                    return repository.save(cat);
                })
                .orElse(null);
    }

    // Eliminar
    public void eliminar(Long id) {
        repository.deleteById(id);
    }
}