// src/components/Header.js
import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Update user state when the authentication state changes
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <header>
      <h1>E-commerce App</h1>
      {user ? (
        <LogoutButton />  // Show the logout button if the user is logged in
      ) : (
        <p>Please log in</p>  // Optionally, show login prompt if no user is logged in
      )}
    </header>
  );
};

export default Header;
