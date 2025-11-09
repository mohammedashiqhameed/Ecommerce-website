import React, {useState} from "react";
import { signup } from "../api";

export default function Signup({ setCurrentPage }){
  const [form, setForm] = useState({username:"",email:"",password:""});
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signup(form);
      if(res.token && res.username){
        // Signup successful - redirect to login page
        alert("Signup successful! Please login with your credentials.");
        setForm({username:"",email:"",password:""});
        setCurrentPage("login");
      } else {
        alert(res.message || "Signup failed");
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
        <h2>Create Account</h2>
        <form onSubmit={submit} className="auth-form">
          <input 
            placeholder="Username" 
            value={form.username} 
            onChange={e=>setForm({...form, username:e.target.value})} 
            required
          />
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
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="auth-link">
          Already have an account?{" "}
          <span onClick={() => setCurrentPage("login")} style={{color: "#2563eb", cursor: "pointer"}}>
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}
