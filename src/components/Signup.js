import { useState, useEffect } from "react"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [hideForm, setHideForm] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setHideForm(true);
      setShowWelcome(true);
      setTimeout(() => {
        navigate("/"); 
      }, 3000);
    } catch (error) {
      setError(error.message);
    }
  };

  // Initialize moving stars background for signup page
  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    });
  }, []);

  return (
    <>
      <Navbar />
      <div className="signup-page">
        {/* Fixed Moving Stars Background */}
        <div className="stars-container">
          {[...Array(50)].map((_, i) => (
            <div key={i} className="star"></div>
          ))}
        </div>
        
        {!hideForm && (
          <div className="signup-container">
            <div className="signup-box">
              <h2>Signup</h2>
              <form onSubmit={handleSignup}>
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
                <motion.button 
                  type="submit" 
                  className="signup-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Signup
                </motion.button>
              </form>
              <p className="signup-link">
                Already Registered? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        )}

        {showWelcome && (
          <div className="welcome-message">
            <h2>🎉 Welcome to Our Platform! 🎉</h2>
            <p style={{ color: "white" }}>We're excited to have you here.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Signup;
