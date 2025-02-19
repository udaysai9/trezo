// src/components/LogoutButton.js
import React from "react";
import { signOut } from "../services/firebaseConfig"; // Import the signOut function from firebaseConfig
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const LogoutButton = () => {
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(); // Calls the signOut function from firebaseConfig
      console.log("User logged out");
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
