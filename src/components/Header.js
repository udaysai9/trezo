import React, { useState, useEffect } from "react";
import { auth } from "../services/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <header>
      <h1>E-commerce App</h1>
      {user ? (
        <LogoutButton />
      ) : (
        <p>Please log in</p>
      )}
    </header>
  );
};

export default Header;
