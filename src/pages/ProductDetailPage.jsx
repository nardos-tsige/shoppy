import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowLeft, FiStar, FiTruck, FiShield, FiRefreshCw } from 'react-icons/fi';
import { api } from '../utils/api';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import './ProductDetailPage.css';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <LoadingSkeleton count={1} />;
  if (error) return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  if (!product) return null;

  const renderStars = () => {
    const rating = product.rating?.rate || 0;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar key={i} className={'star ' + (i <= Math.round(rating) ? 'filled' : '')} />
      );
    }
    return stars;
  };

  return (
    <div className="product-detail">
      <Link to="/shop" className="back-link"><FiArrowLeft /> <span>Back to Shop</span></Link>
      
      <div className="product-detail-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        
        <div className="product-info-section">
          <div className="product-category-badge">{product.category}</div>
          <h1 className="product-detail-title">{product.title}</h1>
          <div className="product-detail-rating">
            <div className="stars">{renderStars()}</div>
            <span className="rating-count">{product.rating?.rate || 0}</span>
            <span className="rating-reviews">({product.rating?.count || 0} reviews)</span>
          </div>
          <p className="product-detail-price">{formatPrice(product.price)}</p>
          <p className="product-detail-description">{product.description}</p>
          
          <div className="product-features">
            <div className="feature"><FiTruck /> <span>Free Shipping</span></div>
            <div className="feature"><FiShield /> <span>Premium Quality</span></div>
            <div className="feature"><FiRefreshCw /> <span>30-Day Returns</span></div>
          </div>

          <button className="add-to-cart-detail" onClick={() => addToCart(product)}>
            <FiShoppingCart /> <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};