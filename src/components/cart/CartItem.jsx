import React from 'react';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import './CartItem.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="cart-item">
      <div className="cart-item-image-wrapper">
        <img src={item.image} alt={item.title} className="cart-item-image" />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-title">{item.title}</h3>
        <p className="cart-item-price">{formatPrice(item.price)}</p>
        <div className="cart-item-controls">
          <div className="quantity-group">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
              <FiMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <FiPlus />
            </button>
          </div>
          <button className="remove-item" onClick={() => removeFromCart(item.id)}>
            <FiTrash2 /> <span>Remove</span>
          </button>
        </div>
        <p className="cart-item-total">Total: {formatPrice(item.price * item.quantity)}</p>
      </div>
    </div>
  );
};