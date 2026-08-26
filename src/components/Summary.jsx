import React from 'react';

/**
 * Summary Component
 * Displays Total Income, Total Expenses, and Current Balance in card format.
 * Demonstrates props usage and basic helper formatting.
 */
const Summary = ({ totalIncome = 0, totalExpenses = 0, currentBalance = 0 }) => {
  // Helper to format currency numbers
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <section className="summary-grid" aria-label="Financial Summary">
      <div className="summary-card balance">
        <span className="summary-label">Current Balance</span>
        <h2 className="summary-value" id="current-balance">
          {formatCurrency(currentBalance)}
        </h2>
      </div>

      <div className="summary-card income">
        <span className="summary-label">Total Income</span>
        <h2 className="summary-value" id="total-income">
          {formatCurrency(totalIncome)}
        </h2>
      </div>

      <div className="summary-card expense">
        <span className="summary-label">Total Expenses</span>
        <h2 className="summary-value" id="total-expenses">
          {formatCurrency(totalExpenses)}
        </h2>
      </div>
    </section>
  );
};

export default Summary;
