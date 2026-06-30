package com.example.demo.service;

import com.example.demo.entity.Producto;
import com.example.demo.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductoService {

    private final ProductoRepository repo;

    public ProductoService(ProductoRepository repo) {
        this.repo = repo;
    }

    public Producto guardar(Producto p) {
        return repo.save(p);
    }

    public List<Producto> listar() {
        return repo.findAll();
    }

    public void eliminar(Long id) {
        repo.deleteById(id);
    }

    public Producto buscarPorId(Long id) {
        return repo.findById(id).orElse(null);
    }
}