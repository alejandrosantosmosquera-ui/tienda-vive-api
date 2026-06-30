package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "pagos")
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long idPago;

    @Column(name = "metodo_pago", length = 50)
    private String metodoPago;

    @Column(name = "fecha")
    private LocalDateTime fecha;

    @Column(name = "estado", length = 50)
    private String estado;

    @ManyToOne
    @JoinColumn(name = "pedidos_id_pedido", nullable = false)
    private Pedido pedido; // Conecta directamente al objeto Pedido afectado

    public Pago() {}

    // Getters y Setters
    public Long getIdPago() { return idPago; }
    public void setIdPago(Long idPago) { this.idPago = idPago; }

    public String getMetodoPago() { return metodoPago; }
    public void setMetodoPago(String metodoPago) { this.metodoPago = metodoPago; }

    public LocalDateTime getFecha() { return fecha; }
    public void setFecha(LocalDateTime fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
}