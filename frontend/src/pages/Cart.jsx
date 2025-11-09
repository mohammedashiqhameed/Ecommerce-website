import React from "react";
import { createOrder } from "../api";

export default function Cart({ cart, setCart, user, clearCart, setCurrentPage }){
  const total = cart.reduce((s,c)=>s + c.price * c.quantity, 0);

  async function placeOrder(){
    if(!user) return alert("Please login to place order");
    if(cart.length === 0) return alert("Cart is empty");
    
    try {
      const order = {
        items: cart.map(c => ({ 
          productId: c.productId, 
          name: c.name, 
          description: c.description || "",
          imageUrl: c.imageUrl || "",
          quantity: c.quantity, 
          price: c.price 
        })),
        total
      };
      const res = await createOrder(user.token, order);
      if(res.id){
        alert("Order placed successfully! Your order has been saved to the database.");
        clearCart();
        // Redirect to orders page to see the placed order
        if(setCurrentPage) {
          setCurrentPage("orders");
        }
      } else {
        alert(res.message || "Order failed. Please try again.");
      }
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  }

  function removeFromCart(productId){
    setCart(cart.filter(c => c.productId !== productId));
  }

  function updateQuantity(productId, change){
    setCart(cart.map(c => 
      c.productId === productId 
        ? {...c, quantity: Math.max(1, c.quantity + change)} 
        : c
    ));
  }

  return (
    <section className="cart-section">
      <h2 className="section-title">Shopping Cart</h2>
      {cart.length === 0 ? (
        <div className="no-products">Your cart is empty</div>
      ) : (
        <div className="cart-container">
          <div className="cart-grid">
            {cart.map(item => (
              <div key={item.productId} className="cart-card">
                <div className="cart-card-image-container">
                  <img 
                    src={item.imageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop"} 
                    alt={item.name}
                    className="cart-card-image"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop";
                    }}
                  />
                </div>
                <div className="cart-card-content">
                  <h3 className="cart-card-name">{item.name}</h3>
                  {item.description && (
                    <p className="cart-card-description">{item.description}</p>
                  )}
                  <div className="cart-card-price">₹{item.price} each</div>
                  <div className="cart-card-controls">
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.productId, -1)}
                    >
                      -
                    </button>
                    <span className="quantity-display">Qty: {item.quantity}</span>
                    <button 
                      className="quantity-btn" 
                      onClick={() => updateQuantity(item.productId, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-card-subtotal">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</div>
                  <button 
                    className="remove-btn" 
                    onClick={() => removeFromCart(item.productId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="cart-total">Total: ₹{total.toFixed(2)}</div>
            <button className="place-order-btn" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
