import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { auth, db } from "../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "./CartPage.css";

const generateRandomCode = () => Math.random().toString(36).substring(2, 10).toUpperCase();

const CartPage = () => {
  const [user] = useAuthState(auth);
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [encodedAddress, setEncodedAddress] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="cart-page centered">
        <h2>Your Cart</h2>
        <p>You must be logged in to view your cart.</p>
        <motion.button 
          onClick={() => navigate("/login")} 
          className="primary-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Login
        </motion.button>
      </div>
    );
  }

  const handlePurchase = async () => {
    if (!address) return alert("Please enter an address!");
    
    const deliveryCode = generateRandomCode();
    setEncodedAddress(deliveryCode);
    setPurchaseSuccess(true);

    const totalPrice = cart.reduce((acc, item) => {
      const itemPrice = parseInt(item.price.replace("Rs ", "").replace(",", ""));
      return acc + itemPrice * item.quantity;
    }, 0);

    const orderData = {
      userId: user.uid,
      items: cart.map((item) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      address,
      deliveryCode,
      createdAt: serverTimestamp(),
    };

    await addDoc(collection(db, "orders"), orderData);
    clearCart();

    setTimeout(() => {
      navigate("/orders");
    }, 3000); 
  };

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Left Side - Cart Items */}
      <div className="cart-left">
        <motion.h2 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Cart
        </motion.h2>

        {/* Cart Items Section */}
        <motion.div 
          className="cart-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {cart.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <motion.div 
                key={index} 
                className="cart-item"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <img src={`/images/${item.imageName}`} alt={item.title} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                </div>
                <div className="cart-actions">
                  <motion.button 
                    className="cart-btn"
                    onClick={() => item.quantity > 1 ? updateCartItem(item, item.quantity - 1) : removeFromCart(item)}
                    whileTap={{ scale: 0.9 }}
                  >
                    -
                  </motion.button>
                  <span className="cart-quantity">{item.quantity}</span>
                  <motion.button 
                    className="cart-btn"
                    onClick={() => updateCartItem(item, item.quantity + 1)}
                    whileTap={{ scale: 0.9 }}
                  >
                    +
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>

      {/* Right Side - Checkout Section */}
      <motion.div 
        className="cart-right"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3>Total: Rs {cart.reduce((acc, item) => acc + parseInt(item.price.replace("Rs ", "").replace(",", "")) * item.quantity, 0).toLocaleString()}</h3>

        {!purchaseSuccess ? (
          <>
            <motion.textarea
              className="address-input"
              placeholder="Enter your shipping address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              whileFocus={{ borderColor: "#6e8efb", scale: 1.02 }}
            ></motion.textarea>
            <motion.button 
              onClick={handlePurchase} 
              className="purchase-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Complete Purchase
            </motion.button>
          </>
        ) : (
          <div className="success-message">
            <h3>Purchase Successful!</h3>
            <p>Your shipment is secured.</p>
            <p><strong>Delivery Code:</strong> {encodedAddress}</p>
            <p>Only the delivery person can view the address when they enter this code.</p>
          </div>
        )}

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <Link to="/" className="continue-shopping">Continue Shopping</Link>
        </motion.div>
      </motion.div>

    </motion.div>
  );
};

export default CartPage;
