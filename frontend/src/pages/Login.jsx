import React, {useState} from "react";
import { login } from "../api";

export default function Login({ setUser, setCurrentPage }){
  const [form, setForm] = useState({email:"",password:""});
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      if(res.token && res.username){
        localStorage.setItem("token", res.token);
        localStorage.setItem("username", res.username);
        setUser({ token: res.token, username: res.username });
        setForm({email:"",password:""});
        setCurrentPage("home"); // Redirect to home after login
      } else {
        alert(res.message || "Login failed");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={submit} className="auth-form">
          <input 
            type="email" 
            placeholder="Email" 
            value={form.email} 
            onChange={e=>setForm({...form, email:e.target.value})} 
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={form.password} 
            onChange={e=>setForm({...form, password:e.target.value})} 
            required
          />
          <button type="submit" disabled={loading} className="auth-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p className="auth-link">
          Don't have an account?{" "}
          <span onClick={() => setCurrentPage("signup")} style={{color: "#2563eb", cursor: "pointer"}}>
            Sign up here
          </span>
        </p>
      </div>
    </div>
  );
}
