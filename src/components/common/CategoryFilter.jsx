import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { getCategoryDisplayName } from '../../utils/helpers';
import '../../styles/CategoryFilter.css';

export const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="category-filter">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="category-select"
      >
        {categories.map(category => (
          <option key={category} value={category}>
            {getCategoryDisplayName(category)}
          </option>
        ))}
      </select>
      <FiChevronDown className="select-icon" />
    </div>
  );
};