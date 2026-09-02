import React from 'react';
import { ProductCard } from './ProductCard';
import './ProductGrid.css';

export const ProductGrid = ({ products }) => {
  if (products.length === 0) {
    return <div className="no-products">No products found</div>;
  }

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};