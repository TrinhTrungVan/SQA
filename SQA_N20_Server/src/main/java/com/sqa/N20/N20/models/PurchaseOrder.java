package com.sqa.N20.N20.models;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto-increment
    private Long id;
    private String purchaseCode;
    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne
    @JoinColumn
    private Supplier supplier;
    private int totalPrice;
    private LocalDateTime createdDate;
    private String note;

    public PurchaseOrder() {
    }

    public PurchaseOrder(Long id, String purchaseCode, List<OrderItem> orderItems, Supplier supplier, int totalPrice, LocalDateTime createdDate, String note) {
        this.id = id;
        this.purchaseCode = purchaseCode;
        this.orderItems = orderItems;
        this.supplier = supplier;
        this.totalPrice = totalPrice;
        this.createdDate = createdDate;
        this.note = note;
    }

    public Supplier getSupplier() {
        return supplier;
    }

    public void setSupplier(Supplier supplier) {
        this.supplier = supplier;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPurchaseCode() {
        return purchaseCode;
    }

    public void setPurchaseCode(String purchaseCode) {
        this.purchaseCode = purchaseCode;
    }

    public List<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(List<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public int getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(int totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "PurchaseOrder{" +
                "id=" + id +
                ", purchaseCode='" + purchaseCode + '\'' +
                ", orderItems=" + orderItems +
                ", supplier=" + supplier +
                ", totalPrice=" + totalPrice +
                ", createdDate=" + createdDate +
                ", note='" + note + '\'' +
                '}';
    }
}
