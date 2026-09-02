import React from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCart } from '../components/cart/EmptyCart';
import './CartPage.css';

export const CartPage = () => {
  const { cart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h1>Shopping Cart</h1>
        <div className="cart-stats">
          <FiShoppingBag />
          <span>{cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}</span>
        </div>
      </div>
      <div className="cart-container">
        <div className="cart-items-section">
          {cart.items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
          <button className="clear-cart-btn" onClick={clearCart}>Clear Cart</button>
        </div>
        <CartSummary />
      </div>
    </div>
  );
};