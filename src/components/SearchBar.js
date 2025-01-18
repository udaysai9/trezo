import React, { useState } from "react";

function SearchBar({ setSearchQuery }) {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    setSearchQuery(e.target.value); // Update parent component's state
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setSearchQuery(query); // Trigger search when Enter is pressed
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={handleSearchChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

export default SearchBar;
