package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.model.Order;
import com.ecommerce.ecommerce_backend.model.OrderItem;
import com.ecommerce.ecommerce_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin("*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/create")
    public Map<String, Object> createOrder(
            @RequestHeader(value = "Authorization", required = false) String authHeader,
            @RequestBody Map<String, Object> orderData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract userId from token (for simplicity, token is user ID)
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                response.put("message", "Authorization token required");
                return response;
            }
            
            String userId = authHeader.replace("Bearer ", "").trim();
            
            // Create order
            Order order = new Order();
            order.setUserId(userId);
            order.setTotal(((Number) orderData.get("total")).doubleValue());
            order.setStatus("BOOKED");
            
            // Convert order items
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> itemsData = (List<Map<String, Object>>) orderData.get("items");
            List<OrderItem> items = new ArrayList<>();
            
            for (Map<String, Object> item : itemsData) {
                OrderItem orderItem = new OrderItem();
                orderItem.setProductId((String) item.get("productId"));
                orderItem.setName((String) item.get("name"));
                orderItem.setDescription((String) item.get("description"));
                orderItem.setImageUrl((String) item.get("imageUrl"));
                orderItem.setQuantity(((Number) item.get("quantity")).intValue());
                orderItem.setPrice(((Number) item.get("price")).doubleValue());
                items.add(orderItem);
            }
            
            order.setItems(items);
            
            Order savedOrder = orderRepository.save(order);
            
            response.put("id", savedOrder.getId());
            response.put("message", "Order created successfully");
            return response;
        } catch (Exception e) {
            response.put("message", "Failed to create order: " + e.getMessage());
            return response;
        }
    }
    
    @GetMapping("/my")
    public List<Order> getMyOrders(@RequestHeader(value = "Authorization", required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return List.of();
        }
        
        // Extract user ID from token
        String userId = authHeader.replace("Bearer ", "").trim();
        return orderRepository.findByUserId(userId);
    }
}

