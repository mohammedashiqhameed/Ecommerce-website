package com.ecommerce.ecommerce_backend.model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import java.util.Date;
import java.util.List;

@Data
@Document(collection = "orders")
public class Order {
  @Id
  private String id;
  private String userId;
  private List<OrderItem> items;
  private double total;
  private Date createdAt = new Date();
  private String status; // e.g., "BOOKED", "SHIPPED"
}