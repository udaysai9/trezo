import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import { motion } from "framer-motion";
import { FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const { cart } = useCart();
  const [user] = useAuthState(auth);

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="navbar-left"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Link to="/" className="logo">Trezo</Link>
      </motion.div>

      <ul className="navbar-list">
        {user ? (
          <>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/orders" className="nav-link">
                <FaBoxOpen className="nav-icon" /> My Orders
              </Link>
            </motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <Link to="/profile" className="nav-link">Profile</Link>
            </motion.li>
          </>
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

        {user && (
          <motion.li
            className="cart-container"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Link to="/cart" className="cart-icon">
              <FaShoppingCart className="nav-icon" />
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
        )}

        {user && (
          <motion.li whileHover={{ scale: 1.1 }} className="logout-button">
            <motion.button
              onClick={() => auth.signOut()}
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
