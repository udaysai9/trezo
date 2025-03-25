import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./CategoryPage.css";

const allProducts = [
  { id: 1, title: "Iqoo Neo", category: "Mobiles", imageName: "mobile1.jpg", price: "Rs 17,999", description: "A powerful smartphone with latest features." },
  { id: 2, title: "Samsung TV", category: "Televisions", imageName: "tv1.jpg", price: "Rs 47,999", description: "A high-definition smart television." },
  { id: 3, title: "Smart Watch", category: "Watches", imageName: "watch1.jpg", price: "Rs 1,999", description: "A stylish and feature-packed smartwatch." },
  { id: 4, title: "DELL Alienware", category: "Laptops", imageName: "laptop1.jpg", price: "Rs 55,999", description: "A high-performance laptop for all your needs." },
  { id: 5, title: "ASUS ROG", category: "Laptops", imageName: "laptop2.jpg", price: "Rs 89,999", description: "A laptop built for gaming with high-end specs." },
  { id: 6, title: "Fitness Watch", category: "Watches", imageName: "watch2.jpg", price: "Rs 2,499", description: "A smartwatch designed for fitness enthusiasts." },
  { id: 7, title: "Sony 4K TV", category: "Televisions", imageName: "tv2.jpg", price: "Rs 67,999", description: "An ultra HD 4K smart television." },
  { id: 8, title: "Iphone", category: "Mobiles", imageName: "mobile2.jpg", price: "Rs 79,999", description: "A premium smartphone with top-tier features." }
];

const CategoryPage = () => {
  const { category } = useParams();
  const filteredProducts = allProducts.filter(
    (product) => product.category.toLowerCase() === category.toLowerCase()
  );

  useEffect(() => {
    const stars = document.querySelectorAll(".star");
    stars.forEach((star) => {
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    });
  }, []);

  return (
    <motion.div 
      className="category-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="stars-container">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star"></div>
        ))}
      </div>

      <h2 style={{ color: "black" }}>{category} Products</h2>
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <motion.li 
            key={product.id} 
            className="product-item"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={`/product/${product.id}`}>
              <img src={`/images/${product.imageName}`} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
              <p>{product.price}</p>
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default CategoryPage;
