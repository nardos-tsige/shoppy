import React from 'react';
import { FiMinus, FiPlus } from 'react-icons/fi';
import '../../styles/QuantityStepper.css';

export const QuantityStepper = ({ quantity, onQuantityChange, min = 1 }) => {
  const handleDecrease = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="quantity-stepper">
      <button 
        className="stepper-btn decrease"
        onClick={handleDecrease}
        disabled={quantity <= min}
      >
        <FiMinus />
      </button>
      <span className="quantity-display">{quantity}</span>
      <button 
        className="stepper-btn increase"
        onClick={handleIncrease}
      >
        <FiPlus />
      </button>
    </div>
  );
};