import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";

function Navbar({ user, handleLogout }) {
  const { cart } = useCart();

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Logo */}
      <motion.div
        className="navbar-left"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link to="/" className="logo">Trezo</Link>
      </motion.div>

      {/* Navigation List */}
      <ul className="navbar-list">
        {user ? (
          <motion.li whileHover={{ scale: 1.1 }}>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </motion.li>
        ) : (
          <>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/login" className="nav-link">Login</Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/signup" className="nav-link">Signup</Link>
            </motion.li>
          </>
        )}

        {/* Animated Cart Icon */}
        <motion.li
          className="cart-container"
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cart.length > 0 && (
              <motion.span
                className="cart-count"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              >
                {cart.length}
              </motion.span>
            )}
          </Link>
        </motion.li>

        {/* Animated Logout Button */}
        {user && (
          <motion.li whileHover={{ scale: 1.1 }} className="logout-button">
            <motion.button
              onClick={handleLogout}
              whileHover={{ backgroundColor: "#ff4d4d", scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Logout
            </motion.button>
          </motion.li>
        )}
      </ul>
    </motion.nav>
  );
}

export default Navbar;
