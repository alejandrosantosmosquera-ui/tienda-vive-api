package com.example.demo.repository;

import com.example.demo.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Aquí puedes dejar el espacio limpio, JpaRepository ya tiene todo lo que necesitamos
}