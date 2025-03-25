import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { color, motion } from "framer-motion";
import "./HomePage.css";

const allProducts = [
  { id: 1, title: "Iqoo Neo", category: "Mobiles", imageName: "mobile1.jpg", price: "Rs 17,999", description: "A powerful smartphone with latest features." },
  { id: 2, title: "Samsung TV", category: "Televisions", imageName: "tv1.jpg", price: "Rs 47,999", description: "A high-definition smart television." },
  { id: 3, title: "Smart Watch", category: "Watches", imageName: "watch1.jpg", price: "Rs 1,999", description: "A stylish and feature-packed smartwatch." },
  { id: 4, title: "Dell Alienware", category: "Laptops", imageName: "laptop1.jpg", price: "Rs 55,999", description: "A high-performance laptop for all your needs." },
  { id: 5, title: "Asus ROG", category: "Laptops", imageName: "laptop2.jpg", price: "Rs 89,999", description: "A laptop built for gaming with high-end specs." },
  { id: 6, title: "Fitness Watch", category: "Watches", imageName: "watch2.jpg", price: "Rs 2,499", description: "A smartwatch designed for fitness enthusiasts." },
  { id: 7, title: "Sony 4K TV", category: "Televisions", imageName: "tv2.jpg", price: "Rs 67,999", description: "An ultra HD 4K smart television." },
  { id: 8, title: "iPhone 15", category: "Mobiles", imageName: "mobile2.jpg", price: "Rs 79,999", description: "A premium smartphone with top-tier features." }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
    });
  }, []);

  const categories = ["All", "Mobiles", "Televisions", "Watches", "Laptops"];

  return (
    <motion.div 
      className="home-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <div className="category-container">
        {categories.map((cat) => (
          <motion.button 
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className={selectedCategory === cat ? "active" : ""}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search for products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="main-content">
        <h2 className="section-title">
          {selectedCategory === "All" ? "All Products" : `${selectedCategory} Products`}
        </h2>
        <ul className="product-list">
          {filteredProducts.map((product, index) => (
            <motion.li 
              key={product.id} 
              className="product-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.1, boxShadow: "0px 5px 20px rgba(255,255,255,0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="product-card-stars">
                {[...Array(10)].map((_, j) => (
                  <div key={j} className="card-star"></div>
                ))}
              </div>
              <Link to={`/product/${product.id}`} className="product-link">
                <img src={`/images/${product.imageName}`} alt={product.title} className="product-image" style={{ backgroundColor: "transparent" }} />
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default HomePage;
