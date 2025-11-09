import React, {useEffect, useState} from "react";
import { fetchMyOrders } from "../api";

export default function Orders({ user }){
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(()=> {
    if(user) {
      setLoading(true);
      setError(null);
      fetchMyOrders(user.token)
        .then(setOrders)
        .catch(err => {
          setError("Failed to load orders");
          console.error(err);
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  // Refresh orders when component mounts or user changes
  useEffect(() => {
    const interval = setInterval(() => {
      if(user) {
        fetchMyOrders(user.token)
          .then(setOrders)
          .catch(err => console.error("Failed to refresh orders:", err));
      }
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, [user]);

  if(!user) return null;

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <section className="orders-section">
      <h2 className="section-title">My Orders</h2>
      {orders.length === 0 ? (
        <div className="no-products">No orders yet</div>
      ) : (
        <div className="orders-container">
          {orders.map(o => (
            <div key={o.id} className="order-card">
              <div className="order-header">
                <div className="order-id">Order # {o.id.substring(0, 8)}...</div>
                <div className={`order-status ${o.status?.toLowerCase() || "booked"}`}>
                  {o.status || "BOOKED"}
                </div>
              </div>
              <div className="order-details">
                <div className="order-date">
                  <strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}
                </div>
                <div className="order-total">
                  <strong>Total:</strong> ₹{o.total.toFixed(2)}
                </div>
              </div>
              <div className="order-items-grid">
                {o.items && o.items.map((it, idx) => (
                  <div key={it.productId || idx} className="order-item-card">
                    <div className="order-item-image-container">
                      <img 
                        src={it.imageUrl || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop"} 
                        alt={it.name}
                        className="order-item-image"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=500&fit=crop";
                        }}
                      />
                    </div>
                    <div className="order-item-info">
                      <h4>{it.name}</h4>
                      {it.description && (
                        <p className="order-item-description">{it.description}</p>
                      )}
                      <div className="order-item-details">
                        <span>Quantity: {it.quantity}</span>
                        <span>Price: ₹{it.price}</span>
                        <span className="order-item-total">Subtotal: ₹{(it.price * it.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
