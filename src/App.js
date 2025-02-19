import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductPage from "./components/ProductPage";
import CartPage from "./components/CartPage";
import { CartProvider } from "./components/CartContext";
import { auth } from "./services/firebaseConfig";
import { signOut } from "firebase/auth";

const pageVariants = {
  initial: { opacity: 0, x: -30 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><HomePage /></motion.div>} />
        <Route path="/products" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ProductList /></motion.div>} />
        <Route path="/product/:id" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><ProductPage /></motion.div>} />
        <Route path="/cart" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><CartPage /></motion.div>} />
        <Route path="/login" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Login /></motion.div>} />
        <Route path="/signup" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Signup /></motion.div>} />
        <Route path="/dashboard" element={<motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit"><Dashboard /></motion.div>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };

  return (
    <CartProvider>
      <Navbar user={user} handleLogout={handleLogout} />
      <AnimatedRoutes />
    </CartProvider>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
