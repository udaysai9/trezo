import React from "react";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <h1>Welcome to Trezo</h1>
        <input type="text" placeholder="Search for products..." />
      </header>
      <ProductList searchQuery="" />
    </div>
  );
};

export default HomePage;
