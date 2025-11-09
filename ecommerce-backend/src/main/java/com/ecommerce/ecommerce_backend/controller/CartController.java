package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.model.CartItem;
import com.ecommerce.ecommerce_backend.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin("*")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @PostMapping("/add")
    public CartItem addToCart(@RequestBody CartItem item) {
        return cartRepository.save(item);
    }

    @GetMapping("/{userId}")
    public List<CartItem> getUserCart(@PathVariable String userId) {
        return cartRepository.findByUserId(userId);
    }
}