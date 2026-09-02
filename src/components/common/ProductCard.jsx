import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { formatPrice, truncateText } from '../../utils/helpers';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const renderStars = () => {
    const rating = product.rating?.rate || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar 
          key={i} 
          className={i <= Math.round(rating) ? 'star-filled' : 'star-empty'} 
        />
      );
    }
    return stars;
  };

  return (
    <div className="product-card">
      <Link to={'/shop/' + product.id} className="product-link">
        <div className="product-image-wrapper">
          <img src={product.image} alt={product.title} className="product-image" />
        </div>
        <h3 className="product-title">{truncateText(product.title, 35)}</h3>
        <div className="product-rating">
          <div className="stars">{renderStars()}</div>
          <span className="rating-count">({product.rating?.count || 0})</span>
        </div>
        <p className="product-price">{formatPrice(product.price)}</p>
      </Link>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        <FiShoppingCart /> <span>Add to Cart</span>
      </button>
    </div>
  );
};