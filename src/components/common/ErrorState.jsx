import React from 'react';
import './ErrorState.css';

export const ErrorState = ({ message, onRetry }) => {
  return (
    <div className="error-state">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};