import React, { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
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
      setHideForm(true); // Hide login form
      setShowThankYou(true); // Show thank-you message

      setTimeout(() => {
        navigate("/"); // Redirect to home page
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

  return (
    <div className="login-container">
      {!hideForm && (
        <div className="login-box">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label style={{ color: "white" }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label style={{ color: "white" }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            {resetMessage && <p className="success">{resetMessage}</p>}
            <button type="submit" className="login-button">Login</button>
            <p className="forgot-password" onClick={handlePasswordReset}>
              Forgot Password?
            </p>
            <p className="signup-option">
              New User? <Link to="/signup">Sign Up</Link>
            </p>
          </form>
        </div>
      )}

      {showThankYou && (
        <div className="thank-you-message">
          <h2>Thank You for Trusting Us! 🙌</h2>
          <p>We appreciate your trust and look forward to serving you.</p>
        </div>
      )}
    </div>
  );
}

export default Login;
