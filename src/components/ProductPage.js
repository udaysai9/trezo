import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../components/CartContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebaseConfig";
import "./ProductPage.css";

const allProducts = [
  { id: 1, title: "Iqoo Neo", category: "Mobiles", imageName: "mobile1.jpg", price: "Rs 17,999", description: "A powerful smartphone with latest features.", features: ["6.5-inch Display", "Triple Camera", "5000mAh Battery", "5G Connectivity"] },
  { id: 2, title: "Samsung TV", category: "Televisions", imageName: "tv1.jpg", price: "Rs 47,999", description: "A high-definition smart television.", features: ["55-inch 4K Display", "Smart TV with Voice Control", "HDR10 Support", "Dolby Audio"] },
  { id: 3, title: "Smart Watch", category: "Watches", imageName: "watch1.jpg", price: "Rs 1,999", description: "A stylish and feature-packed smartwatch.", features: ["Heart Rate Monitor", "Sleep Tracking", "Water Resistant", "7 Days Battery Life"] },
  { id: 4, title: "Dell Alienware", category: "Laptops", imageName: "laptop1.jpg", price: "Rs 55,999", description: "A high-performance laptop for all your needs.", features: ["Intel i7 Processor", "16GB RAM", "512GB SSD", "15.6-inch FHD Display"] },
  { id: 5, title: "ASUS ROG", category: "Laptops", imageName: "laptop2.jpg", price: "Rs 89,999", description: "A laptop built for gaming with high-end specs.", features: ["AMD Ryzen 7 Processor", "32GB RAM", "1TB SSD", "144Hz Refresh Rate Display", "NVIDIA RTX 3070"] },
  { id: 6, title: "Fitness Watch", category: "Watches", imageName: "watch2.jpg", price: "Rs 2,499", description: "A smartwatch designed for fitness enthusiasts.", features: ["Blood Oxygen Monitoring", "Step Counter", "Multi-Sport Mode", "10 Days Battery Life"] },
  { id: 7, title: "Sony 4K TV", category: "Televisions", imageName: "tv2.jpg", price: "Rs 67,999", description: "An ultra HD 4K smart television.", features: ["65-inch OLED Display", "Dolby Vision & Atmos", "Google Assistant & Alexa", "120Hz Refresh Rate"] },
  { id: 8, title: "Iphone 15", category: "Mobiles", imageName: "mobile2.jpg", price: "Rs 79,999", description: "A premium smartphone with top-tier features.", features: ["6.8-inch Dynamic AMOLED", "Apple Intelligence", "A16 Bionic Chip", "Wireless Charging", "IP68 Water Resistant"] }
];

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [user] = useAuthState(auth);
  const product = allProducts.find((item) => item.id === parseInt(id));
  const [showOptions, setShowOptions] = useState(false);

  if (!product) {
    return <h2>Product not found</h2>;
  }

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to the cart.");
      return;
    }
    addToCart(product);
    setShowOptions(true);
  };

  // Get related products from the same category (excluding current product)
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 2); // show two related products

  return (
    <div className="product-page-container">
      <div className="product-image-container">
        <img src={`/images/${product.imageName}`} alt={product.title} className="product-page-image" />
      </div>
      <div className="product-info">
        <h2>{product.title}</h2>
        <p className="product-price">{product.price}</p>
        <p className="product-description">{product.description}</p>
        <h3>Features:</h3>
        <ul className="product-features">
          {product.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        {user ? (
          <>
            <button onClick={handleAddToCart} className="add-to-cart-btn">Add to Cart</button>
            {showOptions && (
              <div className="cart-actions">
                <button onClick={() => navigate("/cart")} className="add-to-cart-btn">Go to Cart</button>
                <button onClick={() => navigate("/")} className="add-to-cart-btn">Add More Products</button>
              </div>
            )}
          </>
        ) : (
          <p>Please <a href="/login">login</a> to add items to the cart.</p>
        )}

        {/* Additional Content to Fill Blank Space */}
        <div className="additional-content">
          <section className="related-products">
            <h3>Recommended Products</h3>
            <div className="related-products-list">
              {relatedProducts.map((relProd) => (
                <div key={relProd.id} className="related-product-card">
                  <Link to={`/product/${relProd.id}`} className="related-product-link">
                    <img src={`/images/${relProd.imageName}`} alt={relProd.title} className="related-product-thumbnail" />
                    <p>{relProd.title}</p>
                  </Link>
                </div>
              ))}
            </div>
          </section>
          <section className="customer-reviews">
            <h3>Customer Reviews</h3>
            <p className="review-placeholder">"Amazing product! Highly recommend it." - User123</p>
            <p className="review-placeholder">"Great value for money." - TechGuru</p>
            <p className="review-placeholder">"Exceeded my expectations." - HappyCustomer</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
