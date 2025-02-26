import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const allProducts = [
  { id: 1, title: "Smart Phone", imageName: "product1.jpg", price: "Rs 17,999", description: "A powerful smartphone with latest features." },
  { id: 2, title: "Television", imageName: "product2.jpg", price: "Rs 47,999", description: "A high-definition smart television." },
  { id: 3, title: "Smart Watch", imageName: "product3.jpg", price: "Rs 1999", description: "A stylish and feature-packed smartwatch." },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = allProducts.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={`/images/${product.imageName}`} alt={product.title} className="product-image" />
              <div className="product-details">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">{product.price}</p>
              </div>
            </Link>
            <Link to={`/product/${product.id}`} className="view-details-btn">View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
