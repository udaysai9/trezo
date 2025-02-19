import React from "react";
import { useCart } from "../components/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <img src={`/images/${item.imageName}`} alt={item.title} width="50" />
              <span>{item.title} - {item.price}</span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/">Continue Shopping</Link>
    </div>
  );
};

export default CartPage;
