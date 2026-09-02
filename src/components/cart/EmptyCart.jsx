import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import './EmptyCart.css';

export const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon-wrapper">
        <FiShoppingBag className="empty-cart-icon" />
      </div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added any items to your cart yet.</p>
      <p className="sub-text">Start exploring our premium collection</p>
      <Link to="/shop" className="shop-link">
        <span>Start Shopping</span> <FiArrowRight />
      </Link>
    </div>
  );
};