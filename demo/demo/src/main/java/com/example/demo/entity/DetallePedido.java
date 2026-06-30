package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "detalle_de_pedidos")
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detalle")
    private Long idDetalle;

    @Column(name = "cantidad")
    private Integer cantidad;

    @Column(name = "precio_unitario")
    private Double precioUnitario;

    @ManyToOne
    @JoinColumn(name = "pedidos_id_pedido", nullable = false)
    private Pedido pedido; // Relación con el Pedido maestro

    @ManyToOne
    @JoinColumn(name = "productos_id_producto", nullable = false)
    private Producto producto; // Relación con el Producto comprado

    public DetallePedido() {}

    // Getters y Setters
    public Long getIdDetalle() { return idDetalle; }
    public void setIdDetalle(Long idDetalle) { this.idDetalle = idDetalle; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public Double getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(Double precioUnitario) { this.precioUnitario = precioUnitario; }

    public Pedido getPedido() { return pedido; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }

    public Producto getProducto() { return producto; }
    public void setProducto(Producto producto) { this.producto = producto; }
}