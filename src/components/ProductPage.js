import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "./ProductPage.css";

const allProducts = [
  { id: 1, title: "Smart Phone", imageName: "product1.jpg", price: "Rs 17,999", description: "A powerful smartphone with latest features." },
  { id: 2, title: "Television", imageName: "product2.jpg", price: "Rs 47,999", description: "A high-definition smart television." },
  { id: 3, title: "Smart Watch", imageName: "product3.jpg", price: "Rs 1999", description: "A stylish and feature-packed smartwatch." },
];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((item) => item.id === parseInt(id));
  const [showPopup, setShowPopup] = useState(false);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // Hide popup after 2 seconds
  };

  return (
    <div className="product-page">
      {/* Left - Product Image */}
      <div className="product-image-container">
        <img src={`/images/${product.imageName}`} alt={product.title} className="product-page-image" />
      </div>

      {/* Right - Product Details */}
      <div className="product-details">
        <h2>{product.title}</h2>
        <p className="product-price">{product.price}</p>
        <p className="product-description">{product.description}</p>
        <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
      </div>

      {/* Popup Notification */}
      {showPopup && <div className="cart-popup">Added to Cart</div>}
    </div>
  );
};

export default ProductPage;
