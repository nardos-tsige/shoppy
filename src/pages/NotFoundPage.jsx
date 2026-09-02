import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiAlertCircle } from 'react-icons/fi';
import './NotFoundPage.css';

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <FiAlertCircle className="not-found-icon" />
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="home-link">
        <FiHome /> <span>Go Back Home</span>
      </Link>
    </div>
  );
};