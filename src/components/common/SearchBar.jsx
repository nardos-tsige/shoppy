import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import '../../styles/SearchBar.css';

export const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />
      <input
        type="text"
        placeholder="Search premium products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-search"
          onClick={() => onSearchChange('')}
        >
          <FiX />
        </button>
      )}
    </div>
  );
};