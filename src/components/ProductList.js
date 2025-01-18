import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./ProductList.css";

// Move allProducts outside of the component if the data is static
const allProducts = [
  { id: 1, title: "Smart Phone", imageName: "product1.jpg", price: "Rs 17,999" },
  { id: 2, title: "Television", imageName: "product2.jpg", price: "Rs 47,999" },
  { id: 3, title: "Smart Watch", imageName: "product3.jpg", price: "Rs 1999" },
];

const ProductList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = searchQuery
      ? allProducts.filter((product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : allProducts;

    setProducts(filteredProducts);
  }, [searchQuery]); // Only searchQuery is needed in dependency

  return (
    <div className="product-list">
      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div className="product-grid"> {/* Add this class for grid layout */}
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              imageName={product.imageName}
              price={product.price}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
