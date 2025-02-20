import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth } from "../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import "./CartPage.css";

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const CartPage = () => {
  const [user] = useAuthState(auth);
  const { cart, updateCartItem, removeFromCart } = useCart();
  const [address, setAddress] = useState("");
  const [encodedAddress, setEncodedAddress] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>You must be logged in to view your cart.</p>
        <motion.button 
          onClick={() => navigate("/login")} 
          className="login-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </div>
    );
  }

  const handlePurchase = () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    setEncodedAddress(generateRandomCode());
    setPurchaseSuccess(true);
  };

  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseInt(item.price.replace("Rs ", "").replace(",", ""));
    return acc + itemPrice * item.quantity;
  }, 0);

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div 
        className="cart-left"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <motion.p 
            className="empty-cart-message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <>
            <div className="cart-grid">
              {cart.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="cart-item"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img 
                    src={`/images/${item.imageName}`} 
                    alt={item.title} 
                    className="cart-image" 
                  />
                  <div className="cart-details">
                    <h3>{item.title}</h3>
                    <p>{item.price}</p>
                    <div className="cart-quantity">
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.quantity > 1) {
                            updateCartItem(item, item.quantity - 1);
                          } else {
                            removeFromCart(item);
                          }
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        -
                      </motion.button>
                      <span>{item.quantity}</span>
                      <motion.button 
                        onClick={(e) => {
                          e.stopPropagation();
                          updateCartItem(item, item.quantity + 1);
                        }}
                        whileTap={{ scale: 0.9 }}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.div 
              className="total-price"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3>Total Price: Rs {totalPrice.toLocaleString()}</h3>
            </motion.div>
          </>
        )}
      </motion.div>

      <motion.div 
        className="cart-right"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {!purchaseSuccess ? (
          <>
            <h3>Enter Shipping Address</h3>
            <motion.textarea
              className="address-input"
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              whileFocus={{ borderColor: "#6e8efb", scale: 1.02 }}
              transition={{ duration: 0.2 }}
            ></motion.textarea>
            <motion.button 
              onClick={handlePurchase} 
              className="purchase-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Purchase
            </motion.button>
          </>
        ) : (
          <>
            <h3>Product Purchased Successfully!</h3>
            <p>Your shipment address is secured.</p>
            <p><strong>Delivery Code:</strong> {encodedAddress}</p>
            <p>Only the delivery person can view the address when they enter this code.</p>
          </>
        )}

        <motion.div 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CartPage;
