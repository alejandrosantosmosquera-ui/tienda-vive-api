package com.example.demo.service;

import com.example.demo.entity.Pago;
import com.example.demo.repository.PagoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class PagoService {

    @Autowired
    private PagoRepository pagoRepository;

    public List<Pago> obtenerTodos() {
        return pagoRepository.findAll();
    }

    public Pago guardarPago(Pago pago) {
        if (pago.getFecha() == null) {
            pago.setFecha(LocalDateTime.now());
        }
        return pagoRepository.save(pago);
    }
}