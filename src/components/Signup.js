import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import Navbar from "../components/Navbar";
import "./Signup.css"; // Make sure the CSS is imported

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); // Reset previous error messages

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Signup successful!");
    } catch (error) {
      setError(error.message); // Set the error message
    }
  };

  return (
    <>
      <Navbar /> {/* Keep the Navbar component */}
      <div className="login-container">
        <div className="login-box">
          <h2 style={{ color: '#6e8efb' }}>Signup</h2>
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
            {error && <p className="error">{error}</p>}
            <button type="submit" className="login-button">Signup</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
