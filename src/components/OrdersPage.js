import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../services/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./OrdersPage.css";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOrders(ordersData);
      };
      fetchOrders();
    }
  }, [user]);

  return (
    <div className="orders-container">
      <motion.div 
        className="orders-sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="orders-title">Your Orders</h2>
        
        {orders.length === 0 ? (
          <p className="empty-orders">No orders placed yet.</p>
        ) : (
          <div className="orders-list">
            {orders.map((order, index) => (
              <motion.div 
                key={index} 
                className="order-card"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3>Order ID: {order.id}</h3>
                <p><strong>Date:</strong> {new Date(order.createdAt?.seconds * 1000).toLocaleDateString()}</p>
                <p><strong>Total:</strong> Rs {order.totalPrice.toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="order-status">{order.status || "Success"}</span></p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default OrdersPage;
