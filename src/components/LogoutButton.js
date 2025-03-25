import React from "react";
import { signOut } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      console.log("User logged out");
      navigate("/login");
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
