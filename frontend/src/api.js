const API_URL = "http://localhost:8080/api";

export async function signup(data){
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function login(data){
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function fetchProducts(){
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }
  return res.json();
}

export async function createOrder(token, order){
  const res = await fetch(`${API_URL}/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(order)
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Failed to create order" }));
    throw new Error(error.message || `Failed to create order: ${res.status}`);
  }
  return res.json();
}

export async function fetchMyOrders(token){
  const res = await fetch(`${API_URL}/orders/my`, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch orders: ${res.status}`);
  }
  return res.json();
}
