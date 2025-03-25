import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../services/firebaseConfig";
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import "./OrdersPage.css";

const allProducts = [
  { id: 1, title: "Iqoo Neo", category: "Mobiles", imageName: "mobile1.jpg", price: "Rs 17,999" },
  { id: 2, title: "Samsung TV", category: "Televisions", imageName: "tv1.jpg", price: "Rs 47,999" },
  { id: 3, title: "Smart Watch", category: "Watches", imageName: "watch1.jpg", price: "Rs 1,999" },
  { id: 4, title: "Dell Alienware", category: "Laptops", imageName: "laptop1.jpg", price: "Rs 55,999" },
  { id: 5, title: "ASUS ROG", category: "Laptops", imageName: "laptop2.jpg", price: "Rs 89,999" },
  { id: 6, title: "Fitness Watch", category: "Watches", imageName: "watch2.jpg", price: "Rs 2,499" },
  { id: 7, title: "Sony 4K TV", category: "Televisions", imageName: "tv2.jpg", price: "Rs 67,999" },
  { id: 8, title: "Iphone 15", category: "Mobiles", imageName: "mobile2.jpg", price: "Rs 79,999" }
];

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const q = query(
          collection(db, "orders"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const ordersData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const order = docSnap.data();
            if (!order.items) return null;
            const createdAtTimestamp = order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000)
              : new Date();
            const orderDateTime = createdAtTimestamp
              .toISOString()
              .replace(/[-:T.]/g, "")
              .substring(0, 14);
            let otp = order.otp || generateOTP();
            if (!order.otp) {
              await updateDoc(doc(db, "orders", docSnap.id), { otp });
            }
            return {
              id: orderDateTime,
              otp,
              ...order,
            };
          })
        );
        setOrders(ordersData.filter((order) => order !== null));
      };
      fetchOrders();
    }
  }, [user]);

  const generateOTP = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const handleOrderClick = (orderId) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
  };

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    });
  }, []);

  return (
    <div className="orders-page">
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <div className="orders-list-container">
        {orders.length === 0 ? (
          <p style={{ color: "white" }} className="empty-orders">No orders placed yet.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-row">
              <motion.div
                className="order-card"
                onClick={() => handleOrderClick(order.id)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3>Order ID: {order.id}</h3>
                <p>
                  <strong>Date:</strong> {order.id.substring(0, 4)}-
                  {order.id.substring(4, 6)}-{order.id.substring(6, 8)}
                </p>
                <p>
                  <strong>Time:</strong> {order.id.substring(8, 10)}:
                  {order.id.substring(10, 12)}:{order.id.substring(12, 14)}
                </p>
                <p>
                  <strong>Total:</strong> Rs{" "}
                  {order.totalPrice ? order.totalPrice.toLocaleString() : "0"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="order-status">
                    {order.status || "Success"}
                  </span>
                </p>
              </motion.div>
              {selectedOrderId === order.id && (
                <motion.div
                  className="order-details-popup"
                  initial={{ opacity: 0, x: 20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ duration: 0.5 }}
                >
                  <h2>Order Details</h2>
                  <div className="order-items-container">
                    {order.items.map((item, index) => {
                      const product = allProducts.find((p) => p.title === item.name);
                      const imageUrl = product ? `/images/${product.imageName}` : "/images/default.jpg";
                      return (
                        <div key={index} className="order-item">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="order-item-image"
                            onError={(e) => (e.target.style.display = "none")}
                          />
                          <div className="order-item-details">
                            <h3>{item.name}</h3>
                            <p><strong>Quantity:</strong> {item.quantity}</p>
                            <p><strong>Price:</strong> Rs {item.price.toLocaleString()}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="order-total">
                    <strong>Total:</strong> Rs {order.totalPrice ? order.totalPrice.toLocaleString() : "0"}
                  </p>
                  <p style={{ color: "white" }}><strong>Payment Method:</strong> {order.paymentMethod}</p>
                  <p style={{ color: "white" }}><strong>Delivery Address:</strong> {order.address}</p>
                  <p style={{ color: "white" }}><strong>Estimate Delivery Date:</strong> 3 days</p>
                  <p className="otp-code">
                    <strong>Delivery OTP:</strong> <span>{order.otp}</span>
                  </p>
                </motion.div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
