# 🛒 Ecommerce Website 

This project is the **backend for a complete Ecommerce Web Application**, built using **Spring Boot** and **MongoDB Atlas**.  
It provides APIs for **user authentication, product management, cart operations, and order processing** — forming the backbone for an ecommerce platform.

---

## 🚀 Tech Stack

- **Java 17+**
- **Spring Boot 3+**
- **Spring Web**
- **Spring Security**
- **Spring Data MongoDB**
- **MongoDB Atlas (Cloud Database)**
- **Lombok** (for cleaner model code)
- **Maven** (for dependency management)

---

## ⚙️ Project Structure


---

## 🔐 Features

### 👤 User Authentication
- Signup and Login using **email and password**
- Passwords securely stored using **BCrypt hashing**
- Generates simple auth tokens (using user ID for simplicity)

### 🛍️ Product Management
- Add and view products
- Stores **name, description, price, image, and stock**

### 🛒 Cart Functionality
- Add items to cart
- Retrieve cart items by user ID

### 📦 Order Management
- Place orders from cart
- Each order stores **user ID, total amount, items, and status**
- Fetch all orders of a logged-in user

---

## 🧠 Endpoints Overview

| HTTP Method | Endpoint | Description |
|--------------|-----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login user and get token |
| `GET` | `/api/products` | Get all products |
| `POST` | `/api/products` | Add new product |
| `POST` | `/api/cart/add` | Add item to cart |
| `GET` | `/api/cart/{userId}` | Get user's cart |
| `POST` | `/api/orders/create` | Create new order |
| `GET` | `/api/orders/my` | Get user's orders |

---

## ⚡ How to Run (Locally)

### 🧩 Prerequisites
- Install **Java 17+**
- Install **Maven**
- Have a **MongoDB Atlas connection string** or local MongoDB running

### 🖥️ Steps
```bash
# 1. Clone the repository
git clone https://github.com/mohammedashiqhameed/Ecommerce-website.git

# 2. Navigate to backend folder
cd ecommerce_backend

# 3. Build the project
mvn clean install

# 4. Run the Spring Boot application
mvn spring-boot:run
