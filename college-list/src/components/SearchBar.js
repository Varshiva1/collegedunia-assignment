import React from 'react';

function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search by college name"
      onChange={(e) => onSearch(e.target.value)}
      className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}

export default SearchBar;