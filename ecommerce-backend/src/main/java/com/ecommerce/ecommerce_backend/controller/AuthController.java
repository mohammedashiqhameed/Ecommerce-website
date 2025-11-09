package com.ecommerce.ecommerce_backend.controller;

import com.ecommerce.ecommerce_backend.model.User;
import com.ecommerce.ecommerce_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        // Check if user already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            response.put("message", "User already exists with this email");
            return response;
        }
        
        user.setPassword(encoder.encode(user.getPassword()));
        User savedUser = userRepository.save(user);
        
        // Generate simple token (using user ID as token for simplicity)
        String token = savedUser.getId();
        
        response.put("token", token);
        response.put("username", savedUser.getUsername());
        response.put("message", "Signup successful!");
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent() && encoder.matches(user.getPassword(), existingUser.get().getPassword())) {
            User foundUser = existingUser.get();
            // Generate simple token (using user ID as token for simplicity)
            String token = foundUser.getId();
            
            response.put("token", token);
            response.put("username", foundUser.getUsername());
            response.put("message", "Login successful!");
            return response;
        }
        
        response.put("message", "Invalid credentials!");
        return response;
    }
}