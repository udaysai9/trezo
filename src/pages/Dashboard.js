import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div>
      <h1>Dashboard</h1>
      <SearchBar setSearchQuery={setSearchQuery} />
      {searchQuery ? (
        <ProductList searchQuery={searchQuery} />
      ) : (
        <p>Start typing to search for products...</p>
      )}
    </div>
  );
};

export default Dashboard;
