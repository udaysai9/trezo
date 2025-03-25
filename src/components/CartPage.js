import React, { useState, useEffect } from "react";
import { useCart } from "../components/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { color, motion } from "framer-motion";
import { auth, db } from "../services/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, limit } from "firebase/firestore";
import "./CartPage.css";

const generateRandomCode = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

const CartPage = () => {
  const [user] = useAuthState(auth);
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [encodedAddress, setEncodedAddress] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchLastOrders = async () => {
        const ordersRef = collection(db, "orders");
        const q = query(
          ordersRef,
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const querySnapshot = await getDocs(q);
        const purchasedProducts = {};
        const fiveMinutesAgo = Date.now() - 300000;
        querySnapshot.forEach((doc) => {
          const orderData = doc.data();
          if (orderData.createdAt?.seconds * 1000 > fiveMinutesAgo) {
            orderData.items.forEach((item) => {
              purchasedProducts[item.name] = orderData.createdAt.seconds * 1000;
            });
          }
        });
        setPurchasedItems(purchasedProducts);
      };
      fetchLastOrders();
    }
  }, [user]);

  const filteredCart = cart.filter((item) => {
    return (
      !purchasedItems[item.title] ||
      purchasedItems[item.title] + 300000 < Date.now()
    );
  });

  const duplicateItems = cart.filter(
    (item) =>
      purchasedItems[item.title] &&
      purchasedItems[item.title] + 300000 > Date.now()
  );

  const handlePurchase = async () => {
    if (!address || !paymentMethod || filteredCart.length === 0) return;
    const deliveryCode = generateRandomCode();
    setEncodedAddress(deliveryCode);
    setPurchaseSuccess(true);
    const totalPrice = filteredCart.reduce((acc, item) => {
      const itemPrice = parseInt(item.price.replace("Rs ", "").replace(",", ""));
      return acc + itemPrice * item.quantity;
    }, 0);
    const orderData = {
      userId: user.uid,
      items: filteredCart.map((item) => ({
        name: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      address,
      paymentMethod,
      deliveryCode,
      createdAt: serverTimestamp(),
    };
    await addDoc(collection(db, "orders"), orderData);
    setPurchasedItems((prev) => ({
      ...prev,
      ...filteredCart.reduce((acc, item) => {
        acc[item.title] = Date.now();
        return acc;
      }, {}),
    }));
    clearCart();
    setTimeout(() => {
      navigate("/orders");
    }, 3000);
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 2 + 2}s`;
    });
  }, []);

  return (
    <motion.div 
      className="cart-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <div className="cart-left">
        <motion.h2 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Your Cart
        </motion.h2>

        <motion.div 
          className="cart-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {cart.length === 0 ? (
            <p style={{ color: "white" }} className="empty-cart">Your cart is empty.</p>
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
                    onClick={() =>
                      item.quantity > 1
                        ? updateCartItem(item, item.quantity - 1)
                        : removeFromCart(item)
                    }
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

      <motion.div 
        className="cart-right"
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <h3 style={{ color: "white" }}>
          Total: Rs{" "}
          {filteredCart.reduce(
            (acc, item) =>
              acc +
              parseInt(item.price.replace("Rs ", "").replace(",", "")) * item.quantity,
            0
          ).toLocaleString()}
        </h3>

        {!purchaseSuccess ? (
          cart.length > 0 && (
            <>
              <motion.textarea
                className="address-input"
                placeholder="Enter your shipping address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ color: "black" }}
                whileFocus={{ borderColor: "#6e8efb", scale: 1.02 }}
              ></motion.textarea>

              <motion.select 
                className="payment-dropdown"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                whileFocus={{ scale: 1.05 }}
              >
                <option value="">Select Payment Method</option>
                <option value="Cash On-Delivery">Cash On-Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Internet Banking">Internet Banking</option>
              </motion.select>

              {duplicateItems.length > 0 && (
                <p className="order-warning">
                  You have already purchased: {duplicateItems.map(item => item.title).join(", ")}.  
                  <button className="remove-duplicate" onClick={() => duplicateItems.forEach(item => removeFromCart(item))}>
                    Remove them to continue
                  </button>
                </p>
              )}

              <motion.button 
                onClick={handlePurchase} 
                className="purchase-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={filteredCart.length === 0}
              >
                Complete Purchase
              </motion.button>
            </>
          )
        ) : (
          <div className="success-message">
            <h3>Purchase Successful!</h3>
            <p>Your shipment is secured.</p>
            <p><strong>Delivery Code:</strong> {encodedAddress}</p>
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
