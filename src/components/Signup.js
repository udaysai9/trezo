import { useState } from "react"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Signup.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [hideForm, setHideForm] = useState(false); // Hide form after signup
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setHideForm(true); // Hide signup form
      setShowWelcome(true); // Show welcome message

      setTimeout(() => {
        navigate("/"); // Redirect to home page
      }, 3000);
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Navbar />
      
      {!hideForm && (
        <div className="login-container">
          <div className="login-box">
            <h2>Signup</h2>
            <form onSubmit={handleSignup}>
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
              <button type="submit" className="login-button">Signup</button>
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
          <p>We're excited to have you here.</p>
        </div>
      )}
    </>
  );
}

export default Signup;
