import React from "react";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <input type="text" placeholder="Search for products..." />
      </header>
      <ProductList searchQuery="" />
    </div>
  );
};

export default HomePage;
