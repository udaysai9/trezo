import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaUser, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaEdit, 
  FaSave,
  FaCreditCard 
} from "react-icons/fa";
import "./ProfilePage.css";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    shippingAddress: "",
    paymentMethods: "",
    email: "",
    orders: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
      setLoading(false);
    };
    fetchUserData();
  }, [user, navigate]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, userData);
    setIsEditing(false);
  };

  // Initialize stars for the background
  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    });
  }, []);

  if (loading) {
    return <motion.div className="loading-screen">Loading...</motion.div>;
  }

  return (
    <div className="profile-page">
      {/* Moving Stars Background */}
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <motion.div 
        className="profile-container"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="profile-main">
          <h2 className="profile-title">User Profile</h2>
          {isEditing ? (
            <motion.form 
              onSubmit={handleSubmit} 
              className="profile-form"
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              transition={{ duration: 0.4 }}
            >
              <div className="input-group">
                <label>Name</label>
                <div className="input-field">
                  <FaUser className="input-icon" />
                  <input 
                    type="text" 
                    name="fullName" 
                    placeholder="Full Name" 
                    value={userData.fullName} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Phone</label>
                <div className="input-field">
                  <FaPhone className="input-icon" />
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    placeholder="Phone Number" 
                    value={userData.phoneNumber} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Shipping Address</label>
                <div className="input-field">
                  <FaMapMarkerAlt className="input-icon" />
                  <input 
                    type="text" 
                    name="shippingAddress" 
                    placeholder="Shipping Address" 
                    value={userData.shippingAddress} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Payment Methods</label>
                <div className="input-field">
                  <FaCreditCard className="input-icon" />
                  <input 
                    type="text" 
                    name="paymentMethods" 
                    placeholder="Payment Methods" 
                    value={userData.paymentMethods} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              <motion.button 
                type="submit" 
                className="edit-button small-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSave /> Save Profile
              </motion.button>
            </motion.form>
          ) : (
            <motion.div 
              className="profile-details"
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
            >
              <p><strong>Name:</strong> {userData.fullName}</p>
              <p><strong>Phone:</strong> {userData.phoneNumber}</p>
              <p><strong>Shipping Address:</strong> {userData.shippingAddress}</p>
              <p><strong>Payment Methods:</strong> {userData.paymentMethods}</p>
              <motion.button 
                className="edit-button small-button"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaEdit /> Edit Profile
              </motion.button>
            </motion.div>
          )}
        </div>
        <div className="profile-sidebar">
          <h3 className="sidebar-title">Profile Overview</h3>
          <ul className="sidebar-list">
            <li className="sidebar-item">Member since: Jan 2025</li>
          </ul>
          <h3 className="sidebar-title">Customer Support</h3>
          <p className="sidebar-text">Call: +91 2345678912</p>
          <p className="sidebar-text">Email: udaycloudacc@outlook.com</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
