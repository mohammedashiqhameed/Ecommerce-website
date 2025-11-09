package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.model.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface CartRepository extends MongoRepository<CartItem, String> {
    List<CartItem> findByUserId(String userId);
}