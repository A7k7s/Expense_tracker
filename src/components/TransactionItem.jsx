import React from 'react';

// Emoji map for visual icons based on category
const CATEGORY_ICONS = {
  Food: '🍕',
  Transport: '🚗',
  Housing: '🏠',
  Entertainment: '🎬',
  Shopping: '🛍️',
  Utilities: '💡',
  Health: '🏥',
  Salary: '💼',
  Freelance: '💻',
  Investment: '📈',
  Gift: '🎁',
  Other: '🏷️'
};

/**
 * TransactionItem Component
 * Renders individual transaction card with details and delete action.
 */
const TransactionItem = ({ transaction, onDeleteTransaction }) => {
  const { id, type, description, amount, category, date } = transaction;

  const isIncome = type === 'income';
  const icon = CATEGORY_ICONS[category] || '🏷️';

  const formattedAmount = `${isIncome ? '+' : '-'}₹${Number(amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // Format date to readable string (e.g., "Aug 26, 2026")
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const d = new Date(year, month - 1, day);
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="transaction-item" id={`transaction-item-${id}`}>
      <div className="item-left">
        <div className={`category-badge-icon ${isIncome ? 'income' : 'expense'}`}>
          {icon}
        </div>
        <div className="item-details">
          <span className="item-desc">{description}</span>
          <div className="item-meta">
            <span>{formatDate(date)}</span>
            <span>•</span>
            <span className="item-category-tag">{category}</span>
          </div>
        </div>
      </div>

      <div className="item-right">
        <span className={`item-amount ${isIncome ? 'income' : 'expense'}`}>
          {formattedAmount}
        </span>
        <button
          type="button"
          className="delete-btn"
          onClick={() => onDeleteTransaction(id)}
          title="Delete Transaction"
          aria-label={`Delete ${description}`}
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default TransactionItem;
