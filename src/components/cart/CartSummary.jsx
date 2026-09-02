import React from 'react';
import { FiCreditCard } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/helpers';
import './CartSummary.css';

export const CartSummary = () => {
  const { getSubtotal, getTax, getTotal } = useCart();
  const subtotal = getSubtotal();
  const tax = getTax();
  const total = getTotal();

  return (
    <div className="cart-summary">
      <h3>Order Summary</h3>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className="summary-row">
        <span>Tax (15%)</span>
        <span>{formatPrice(tax)}</span>
      </div>
      <div className="summary-divider"></div>
      <div className="summary-row total">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
      <button className="checkout-button">
        <FiCreditCard /> <span>Proceed to Checkout</span>
      </button>
    </div>
  );
};