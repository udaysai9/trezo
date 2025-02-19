import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";

const allProducts = [
  { id: 1, title: "Smart Phone", imageName: "product1.jpg", price: "Rs 17,999" },
  { id: 2, title: "Television", imageName: "product2.jpg", price: "Rs 47,999" },
  { id: 3, title: "Smart Watch", imageName: "product3.jpg", price: "Rs 1,999" },
];

const ProductList = () => {
  const [products, setProducts] = useState(allProducts);

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
