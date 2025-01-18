import React from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Import the CSS for styling

function Navbar({ user, handleLogout }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        {user ? (
          <>
            <li className="logout-button">
              <button onClick={handleLogout}>Logout</button>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
