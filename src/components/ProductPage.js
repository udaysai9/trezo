import React from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";

const allProducts = [
  { id: 1, title: "Smart Phone", imageName: "product1.jpg", price: "Rs 17,999", description: "A powerful smartphone with amazing features." },
  { id: 2, title: "Television", imageName: "product2.jpg", price: "Rs 47,999", description: "A 4K Ultra HD Smart TV with vibrant colors." },
  { id: 3, title: "Smart Watch", imageName: "product3.jpg", price: "Rs 1,999", description: "A stylish smartwatch with health tracking." },
];

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-page">
      <img src={`/images/${product.imageName}`} alt={product.title} />
      <h2>{product.title}</h2>
      <p>{product.price}</p>
      <p>{product.description}</p>
      <button onClick={() => addToCart(product)} className="add-to-cart-btn">
        Add to Cart
      </button>
      <Link to="/cart" className="view-cart-link">View Cart</Link>
    </div>
  );
};

export default ProductPage;
