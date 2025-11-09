import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";

const API_URL = "http://localhost:8080/api";

function App() {
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    const userId = localStorage.getItem("userId");
    return t ? { token: t, username, userId } : null;
  });

  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState("home");

  // ✅ Fetch user’s cart after login
  useEffect(() => {
    async function fetchUserCart() {
      if (user && user.userId) {
        try {
          const res = await fetch(`${API_URL}/cart/${user.userId}`);
          if (res.ok) {
            const data = await res.json();
            setCart(data);
          } else {
            console.error("Failed to fetch cart:", res.status);
            setCart([]);
          }
        } catch (err) {
          console.error("Error fetching cart:", err);
          setCart([]);
        }
      } else {
        setCart([]); // reset cart when logged out
      }
    }
    fetchUserCart();
  }, [user]);

  async function addToCart(product, redirectToCart = false) {
    if (!user) {
      alert("Please login to add items to cart.");
      setCurrentPage("login");
      return;
    }

    const item = {
      userId: user.userId,
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    };

    try {
      const res = await fetch(`${API_URL}/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      if (res.ok) {
        const savedItem = await res.json();
        setCart((prev) => {
          const existing = prev.find((c) => c.productId === savedItem.productId);
          if (existing) {
            return prev.map((c) =>
              c.productId === savedItem.productId
                ? { ...c, quantity: c.quantity + 1 }
                : c
            );
          } else {
            return [...prev, savedItem];
          }
        });
        if (redirectToCart) setCurrentPage("cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  }

  function clearCart() {
    setCart([]);
  }

  function renderPage() {
    switch (currentPage) {
      case "home":
        return <Home addToCart={addToCart} />;
      case "login":
        return <Login setUser={setUser} setCurrentPage={setCurrentPage} />;
      case "signup":
        return <Signup setCurrentPage={setCurrentPage} />;
      case "cart":
        return (
          <Cart
            cart={cart}
            setCart={setCart}
            user={user}
            clearCart={clearCart}
            setCurrentPage={setCurrentPage}
          />
        );
      case "orders":
        return user ? (
          <Orders user={user} />
        ) : (
          <Login setUser={setUser} setCurrentPage={setCurrentPage} />
        );
      default:
        return <Home addToCart={addToCart} />;
    }
  }

  return (
    <div>
      <NavBar
        user={user}
        setUser={setUser}
        cartCount={cart.reduce((s, c) => s + c.quantity, 0)}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <main style={{ padding: "20px", minHeight: "calc(100vh - 80px)" }}>
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
