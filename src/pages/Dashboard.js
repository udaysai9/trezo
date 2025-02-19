import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import ProductList from "../components/ProductList";
import "./Dashboard.css"; // Make sure to create or link this CSS file

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="dashboard-container">
      {/* Fixed search bar */}
      <div className="search-bar-container">
        <SearchBar setSearchQuery={setSearchQuery} />
      </div>
      
      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        {searchQuery ? (
          <ProductList searchQuery={searchQuery} />
        ) : (
          <p>Start typing to search for products...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
