import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiTruck, FiShield, FiStar, FiAward, FiMonitor, FiPackage, FiUser, FiHeart } from 'react-icons/fi';
import { api } from '../utils/api';
import { ProductCard } from '../components/common/ProductCard';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import './HomePage.css';

export const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const products = await api.getLimitedProducts(8);
        setFeaturedProducts(products || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err.message || 'Failed to load products');
        setFeaturedProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const categories = [
    { name: 'Electronics', icon: FiMonitor, path: 'electronics' },
    { name: 'Jewelery', icon: FiPackage, path: 'jewelery' },
    { name: "Men's Fashion", icon: FiUser, path: "men's clothing" },
    { name: "Women's Fashion", icon: FiHeart, path: "women's clothing" },
  ];

  const features = [
    { icon: FiTruck, title: 'Free Delivery', desc: 'Complimentary shipping on all orders' },
    { icon: FiShield, title: 'Premium Quality', desc: '100% authentic luxury products' },
    { icon: FiStar, title: '5-Star Rated', desc: 'Trusted by customers worldwide' },
    { icon: FiAward, title: 'Best Prices', desc: 'Luxury at affordable prices' }
  ];

  return (
    <div className="home-page">
      <section id="hero" className={"hero-section " + (isVisible['hero'] ? 'visible' : '')} ref={(el) => (sectionRefs.current['hero'] = el)}>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">✦ Luxury Collection</span>
            <h1>Discover Premium</h1>
            <h1 className="gradient-text">Luxury Living</h1>
            <p>Curated selection of the finest products for the discerning connoisseur</p>
            <div className="hero-buttons">
              <Link to="/shop" className="btn-primary"><span>Explore Collection</span> <FiArrowRight /></Link>
              <Link to="/shop" className="btn-secondary"><span>View All</span></Link>
            </div>
          </div>
          <div className="hero-stats">
            <div className="stat"><span className="stat-number">1000+</span><span className="stat-label">Luxury Products</span></div>
            <div className="stat"><span className="stat-number">99.9%</span><span className="stat-label">Satisfaction Rate</span></div>
            <div className="stat"><span className="stat-number">50K+</span><span className="stat-label">Happy Customers</span></div>
            <div className="stat"><span className="stat-number">4.9★</span><span className="stat-label">Average Rating</span></div>
          </div>
        </div>
      </section>

      <section id="features" className={"features-section " + (isVisible['features'] ? 'visible' : '')} ref={(el) => (sectionRefs.current['features'] = el)}>
        <div className="features-grid">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="feature-card card">
                <div className="feature-icon-wrapper"><Icon className="feature-icon" /></div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="categories" className={"categories-section " + (isVisible['categories'] ? 'visible' : '')} ref={(el) => (sectionRefs.current['categories'] = el)}>
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Explore our curated luxury collections</p>
        </div>
        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link key={index} to={"/shop?category=" + category.path} className="category-card card">
                <div className="category-icon-wrapper" style={{ background: "#D4AF37" + "15" }}>
                  <Icon className="category-icon" style={{ color: "#D4AF37" }} />
                </div>
                <h3>{category.name}</h3>
                <span className="category-arrow"><FiArrowRight /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <section id="featured" className={"featured-section " + (isVisible['featured'] ? 'visible' : '')} ref={(el) => (sectionRefs.current['featured'] = el)}>
        <div className="section-header">
          <h2>Featured Collection</h2>
          <p>Handpicked premium selections for you</p>
        </div>
        {error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => window.location.reload()} className="btn-primary">Retry</button>
          </div>
        ) : loading ? (
          <div className="product-grid">
            <LoadingSkeleton count={8} />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div className="product-grid">
            {featuredProducts.map((product, index) => (
              <div key={product.id} style={{ animationDelay: (index * 0.1) + "s" }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="no-products">No products available</div>
        )}
      </section>
    </div>
  );
};