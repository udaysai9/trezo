import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "./Navbar.css";
import { FaShoppingCart } from "react-icons/fa";

function Navbar({ user, handleLogout }) {
  const { cart } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">Trezo</Link>
      </div>

      <ul className="navbar-list">
        {user ? (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
        <li className="cart-container">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
