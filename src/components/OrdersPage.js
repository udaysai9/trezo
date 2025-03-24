import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { db, auth } from "../services/firebaseConfig";
import { collection, query, where, getDocs, orderBy, updateDoc, doc } from "firebase/firestore";
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
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const fetchOrders = async () => {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const ordersData = await Promise.all(
          querySnapshot.docs.map(async (docSnap) => {
            const order = docSnap.data();
            const createdAtTimestamp = order.createdAt?.seconds
              ? new Date(order.createdAt.seconds * 1000)
              : new Date();

            const orderDateTime = createdAtTimestamp.toISOString().replace(/[-:T.]/g, "").substring(0, 14);

            let otp = order.otp || generateOTP();
            
            // Update OTP in Firestore if it's missing
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

        setOrders(ordersData);
      };

      fetchOrders();
    }
  }, [user]);

  const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setAnimationKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="orders-container">
      {/* Sidebar with order list */}
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
            {orders.map((order) => (
              <motion.div
                key={order.id}
                className="order-card"
                onClick={() => handleOrderClick(order)}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <h3>Order ID: {order.id}</h3>
                <p><strong>Date:</strong> {order.id.substring(0, 4)}-{order.id.substring(4, 6)}-{order.id.substring(6, 8)}</p>
                <p><strong>Time:</strong> {order.id.substring(8, 10)}:{order.id.substring(10, 12)}:{order.id.substring(12, 14)}</p>
                <p><strong>Total:</strong> Rs {order.totalPrice.toLocaleString()}</p>
                <p><strong>Status:</strong> <span className="order-status">{order.status || "Success"}</span></p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Order Details Section */}
      {selectedOrder && (
        <motion.div
          key={animationKey}
          className="order-details"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
        >
          <motion.h2
            key={animationKey + "title"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Order Details
          </motion.h2>

          <div className="order-items-container">
            {selectedOrder.items.map((item, index) => {
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

          <p className="order-total"><strong>Total:</strong> Rs {selectedOrder.totalPrice.toLocaleString()}</p>
          <p><strong>Payment Method:</strong> {selectedOrder.paymentMethod}</p>
          <p><strong>Delivery Address:</strong> {selectedOrder.address}</p>
          <p className="otp-code"><strong>Delivery OTP:</strong> <span>{selectedOrder.otp}</span></p>
        </motion.div>
      )}
    </div>
  );
};

export default OrdersPage;
