package com.ecommerce.ecommerce_backend.model;

import lombok.Data;

@Data
public class OrderItem {
    private String productId;
    private String name;
    private String description;
    private String imageUrl;
    private int quantity;
    private double price;
}