import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaPhone, FaMapMarkerAlt, FaSave } from "react-icons/fa";
import "./ProfilePage.css";

const ProfilePage = () => {
  const auth = getAuth();
  const user = auth.currentUser;
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    const fetchUserData = async () => {
      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      } else {
        setIsNewUser(true);
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
    setIsNewUser(false);
  };

  if (loading) {
    return <motion.div className="loading-screen" animate={{ opacity: [0, 1] }}>Loading...</motion.div>;
  }

  return (
    <motion.div 
      className="profile-container"
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="profile-title">User Profile</h2>
      {isNewUser ? (
        <motion.form 
          onSubmit={handleSubmit} 
          className="profile-form"
          initial={{ scale: 0.9, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          transition={{ duration: 0.4 }}
        >
          <div className="input-group">
            <FaUser className="input-icon" />
            <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <FaPhone className="input-icon" />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={userData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <FaMapMarkerAlt className="input-icon" />
            <input type="text" name="address" placeholder="Address" value={userData.address} onChange={handleChange} required />
          </div>
          <motion.button 
            type="submit" 
            className="save-button"
            whileHover={{ scale: 1.05, backgroundColor: "#4CAF50" }}
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
          <p><FaUser /> <strong>Name:</strong> {userData.fullName}</p>
          <p><FaPhone /> <strong>Phone:</strong> {userData.phoneNumber}</p>
          <p><FaMapMarkerAlt /> <strong>Address:</strong> {userData.address}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProfilePage;
