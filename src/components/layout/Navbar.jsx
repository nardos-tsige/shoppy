import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiShoppingBag, FiHome, FiGrid, FiShoppingCart, FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export const Navbar = () => {
  const { getTotalItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [theme, setTheme] = useState('light');
  const location = useLocation();
  const itemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  return (
    <nav className={'navbar ' + (isScrolled ? 'scrolled' : '')}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <FiShoppingBag className="brand-icon" />
          <span className="brand-text">Shoppy</span>
          <span className="brand-dot">✦</span>
        </Link>

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>

        <div className={'navbar-links ' + (isOpen ? 'open' : '')}>
          <Link to="/" className={'nav-link ' + (location.pathname === '/' ? 'active' : '')} onClick={() => setIsOpen(false)}>
            <FiHome className="nav-icon" /> <span>Home</span>
          </Link>
          <Link to="/shop" className={'nav-link ' + (location.pathname === '/shop' ? 'active' : '')} onClick={() => setIsOpen(false)}>
            <FiGrid className="nav-icon" /> <span>Shop</span>
          </Link>
          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsOpen(false)}>
            <FiShoppingCart className="nav-icon" /> <span>Cart</span>
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </div>
      </div>
    </nav>
  );
};