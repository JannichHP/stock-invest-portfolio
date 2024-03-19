import React, { useState, useEffect } from 'react';
import searchData from '../stocknames.json';
import { getStockData } from '../api';

const StockPrices = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [stockData, setStockData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = '70UYDQNQPF65GBY6';
  const API_BASE_URL = 'https://www.alphavantage.co';

  useEffect(() => {
    filterSuggestions();
  }, [searchQuery]);

  const filterSuggestions = () => {
    if (searchQuery.trim() === '') {
      setSuggestions([]);
      return;
    }

    const lowercaseQuery = searchQuery.toLowerCase();
    const filteredSuggestions = searchData.filter(
      (item) =>
        (category === 'All' || item['Market Category'] === category) &&
        (item.Symbol.toLowerCase().includes(lowercaseQuery) ||
          item['Security Name'].toLowerCase().includes(lowercaseQuery))
    );

    setSuggestions(filteredSuggestions);
  };

  const handleSearch = async () => {
    console.log('Searching...');
    try {
      const data = await getStockData(searchQuery, API_KEY, API_BASE_URL); // Pass API key and base URL
      setStockData(data);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (symbol) => {
    setSearchQuery(symbol);
    setSuggestions([]);
  };

  return (
    <div>
      <div>
        <label htmlFor="category">Select Market Category: </label>
        <select id="category" value={category} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Common Stock">Common Stock</option>
          <option value="ETF">ETF</option>
          <option value="Warrant">Warrant</option>
        </select>
      </div>
      <br></br>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Apple, Adobe, Autodesk"
        list="suggestions"
        className="searchInput"
      />
      <datalist id="suggestions">
        {suggestions.map((item) => (
          <option key={item.Symbol} value={item.Symbol} onClick={() => handleSuggestionClick(item.Symbol)}>
            {item['Security Name']}
          </option>
        ))}
      </datalist>
      <button onClick={handleSearch} className="searchButton">
        Search
      </button>
    </div>
  );
};

export default StockPrices;