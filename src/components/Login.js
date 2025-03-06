import React, { useState } from "react";
import { auth } from "../services/firebaseConfig";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setResetMessage("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      if (error.code === "Wrong password") {
        setError("Wrong password. Please try again.");
      } else if (error.code === "Invalid Credentials") {
        setError("No user found with this email.");
      } else {
        setError("Wrong Email/Password");
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
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
          <label style={{ color: 'black' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
          <label style={{ color: 'black' }}>Password</label>
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
        </form>
      </div>
    </div>
  );
}

export default Login;
