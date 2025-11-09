import React from "react";

export default function NavBar({user, setUser, cartCount, setCurrentPage, currentPage}){
  function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null);
    setCurrentPage("home");
  }
  
  return (
    <nav className="nav">
      <div className="logo" onClick={() => setCurrentPage("home")} style={{cursor: "pointer"}}>
        MyShop
      </div>
      <div className="nav-right">
        <button 
          className={`nav-link ${currentPage === "home" ? "active" : ""}`}
          onClick={() => setCurrentPage("home")}
        >
          Home
        </button>
        <button 
          className={`nav-link ${currentPage === "cart" ? "active" : ""}`}
          onClick={() => setCurrentPage("cart")}
        >
          Cart ({cartCount})
        </button>
        {user ? (
          <>
            <button 
              className={`nav-link ${currentPage === "orders" ? "active" : ""}`}
              onClick={() => setCurrentPage("orders")}
            >
              Orders
            </button>
            <div className="user-info">Hello, {user.username}</div>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <button 
              className={`nav-link ${currentPage === "login" ? "active" : ""}`}
              onClick={() => setCurrentPage("login")}
            >
              Login
            </button>
            <button 
              className={`nav-link ${currentPage === "signup" ? "active" : ""}`}
              onClick={() => setCurrentPage("signup")}
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
