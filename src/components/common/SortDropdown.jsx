import React from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { SORT_OPTIONS } from '../../utils/constants';
import '../../styles/SortDropdown.css';

export const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="sort-dropdown">
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        {SORT_OPTIONS.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <FiChevronDown className="select-icon" />
    </div>
  );
};