import React, { useState } from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";
import "./CartPage.css";

const generateRandomCode = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const CartPage = () => {
  const { cart } = useCart();
  const [address, setAddress] = useState("");
  const [encodedAddress, setEncodedAddress] = useState(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [deliveryCode, setDeliveryCode] = useState("");

  const handlePurchase = () => {
    if (!address) {
      alert("Please enter an address!");
      return;
    }
    const code = generateRandomCode();
    setEncodedAddress(code);
    setPurchaseSuccess(true);
  };

  return (
    <div className="cart-page">
      {/* Left: Cart Items as Capsules */}
      <div className="cart-left">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <div className="cart-grid">
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={`/images/${item.imageName}`} alt={item.title} className="cart-image" />
                <div className="cart-details">
                  <h3>{item.title}</h3>
                  <p>{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: Address & Purchase Section */}
      <div className="cart-right">
        {!purchaseSuccess ? (
          <>
            <h3>Enter Shipping Address</h3>
            <textarea
              className="address-input"
              placeholder="Enter your full address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
            <button onClick={handlePurchase} className="purchase-btn">
              Purchase
            </button>
          </>
        ) : (
          <>
            <h3>Product Purchased Successfully!</h3>
            <p>Your shipment address is secured.</p>
            <p><strong>Delivery Code:</strong> {encodedAddress}</p>
            <p>Only the delivery person can view the address when they enter this code.</p>
          </>
        )}

        <Link to="/" className="continue-shopping">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default CartPage;
