import React from 'react';
import './LoadingSkeleton.css';

export const LoadingSkeleton = ({ count = 1 }) => {
  return (
    <>
      {Array(count).fill().map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      ))}
    </>
  );
};