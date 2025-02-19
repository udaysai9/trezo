import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ id, title, imageName, price }) => {
  return (
    <div className="product-card">
      <Link to={`/product/${id}`} className="product-link">
        <div className="card-container">
          <img src={`/images/${imageName}`} alt={title} className="product-image" />
          <div className="product-info">
            <h3>{title}</h3>
            <p>{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
