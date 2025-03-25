import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setHideForm(true);
      setShowThankYou(true);

      setTimeout(() => {
        navigate("/");
      }, 2500);
      
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        setError("Wrong password. Please try again.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("Invalid Email or Password.");
      }
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset password.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setResetMessage("Password reset link sent to your email.");
      setError("");
    } catch (error) {
      setError("Failed to send reset email. Please check your email.");
      setResetMessage("");
    }
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
    <div className="login-page">
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <motion.div 
        className="login-box"
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error" style={{ color: "white" }}>{error}</p>}
          {resetMessage && <p className="success" style={{ color: "white" }}>{resetMessage}</p>}
          <motion.button 
            type="submit" 
            className="login-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login
          </motion.button>
          <p className="forgot-password" onClick={handlePasswordReset}>
            Forgot Password?
          </p>
          <p className="signup-option">
            New User? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </motion.div>

      {showThankYou && (
        <motion.div 
          className="thank-you-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Thank You for Trusting Us! 🙌</h2>
          <p style={{ color: "white" }}>We appreciate your trust and look forward to serving you.</p>
        </motion.div>
      )}
    </div>
  );
}

export default Login;
