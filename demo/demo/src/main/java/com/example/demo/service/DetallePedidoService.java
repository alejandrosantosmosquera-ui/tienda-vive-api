package com.example.demo.service;

import com.example.demo.entity.DetallePedido;
import com.example.demo.repository.DetallePedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DetallePedidoService {

    @Autowired
    private DetallePedidoRepository detallePedidoRepository;

    public List<DetallePedido> obtenerTodos() {
        return detallePedidoRepository.findAll();
    }

    public DetallePedido guardarDetalle(DetallePedido detallePedido) {
        return detallePedidoRepository.save(detallePedido);
    }
}