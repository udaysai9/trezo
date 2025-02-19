import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ id, title, imageName, price }) => {
  const imageUrl = `/images/${imageName}`;

  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="card-container">
        <img src={imageUrl} alt={title} className="product-image" />
        <div className="product-info">
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
        <button className="add-to-cart-btn">
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
