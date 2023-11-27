
import React from 'react';
import './SearchBar.css';
import useSearchStore from './searchStore';

const SearchBar = () => {

  const { updateSearchOptions } = useSearchStore();

  const handleSearch = () => {
    const keywords = document.getElementById('search-input').value;
    // You can also get other search options (category, author, sortBy, sortOrder) similarly
    // For simplicity, let's assume you have those values
    const category = ' ';
    const author = ' ';
    const sortBy = ' ';
    const sortOrder = 'asc';
    console.log('SearchBar - Keywords:', keywords);

    // Update search options in the search store
    updateSearchOptions({ keywords, category, author, sortBy, sortOrder });
  };
 
  return (
    <div className="search-bar">
      <input type="text" placeholder="Enter keyword" className="search-input" />
      <button onClick={handleSearch}  id ="search-input" className="search-button">
        Search
      </button>
    </div>
  );
};

export default SearchBar;