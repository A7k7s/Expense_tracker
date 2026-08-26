import React from 'react';

/**
 * FilterBar Component
 * Search input, Type filter pills (All, Income, Expense), and Category filter dropdown.
 */
const FilterBar = ({
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  searchQuery,
  setSearchQuery,
  allCategories = []
}) => {
  return (
    <div className="filter-bar">
      {/* Search Input Box */}
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          id="search-input"
          type="text"
          className="search-input"
          placeholder="Search by description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Filter Row: Type Pills & Category Select */}
      <div className="filter-row">
        <div className="filter-pills">
          <button
            type="button"
            className={`pill-btn ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
            id="filter-all-btn"
          >
            All
          </button>
          <button
            type="button"
            className={`pill-btn ${filterType === 'income' ? 'active' : ''}`}
            onClick={() => setFilterType('income')}
            id="filter-income-btn"
          >
            Income
          </button>
          <button
            type="button"
            className={`pill-btn ${filterType === 'expense' ? 'active' : ''}`}
            onClick={() => setFilterType('expense')}
            id="filter-expense-btn"
          >
            Expense
          </button>
        </div>

        <select
          id="category-filter-select"
          className="form-control category-select"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {allCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
