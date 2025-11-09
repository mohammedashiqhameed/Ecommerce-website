package com.ecommerce.ecommerce_backend.repository;

import com.ecommerce.ecommerce_backend.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ProductRepository extends MongoRepository<Product, String> {}