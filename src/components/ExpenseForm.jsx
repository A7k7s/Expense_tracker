import React, { useState } from 'react';

const CATEGORIES = {
  expense: ['Food', 'Transport', 'Housing', 'Entertainment', 'Shopping', 'Utilities', 'Health', 'Other'],
  income: ['Salary', 'Freelance', 'Investment', 'Gift', 'Other']
};

/**
 * ExpenseForm Component
 * Form to capture transaction details with basic input validation.
 * Uses useState for local form control and validation errors.
 */
const ExpenseForm = ({ onAddTransaction }) => {
  const today = new Date().toISOString().split('T')[0];

  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES.expense[0]);
  const [date, setDate] = useState(today);

  // Validation errors state
  const [errors, setErrors] = useState({});

  const handleTypeChange = (newType) => {
    setType(newType);
    setCategory(CATEGORIES[newType][0]); // Reset to first category of new type
  };

  const validateForm = () => {
    const newErrors = {};

    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.trim().length < 2) {
      newErrors.description = 'Must be at least 2 characters';
    }

    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than ₹0';
    }

    if (!date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTransaction = {
      id: Date.now(),
      type,
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date
    };

    onAddTransaction(newTransaction);

    // Reset form fields
    setDescription('');
    setAmount('');
    setDate(today);
    setErrors({});
  };

  return (
    <div className="glass-card">
      <h3 className="section-title">➕ Add Transaction</h3>
      
      <form onSubmit={handleSubmit} noValidate>
        {/* Income / Expense Type Toggle */}
        <div className="type-toggle">
          <button
            type="button"
            className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
            onClick={() => handleTypeChange('expense')}
            id="type-expense-btn"
          >
            💸 Expense
          </button>
          <button
            type="button"
            className={`type-btn ${type === 'income' ? 'active income' : ''}`}
            onClick={() => handleTypeChange('income')}
            id="type-income-btn"
          >
            💰 Income
          </button>
        </div>

        {/* Description Field */}
        <div className="form-group">
          <label htmlFor="description-input" className="form-label">Description</label>
          <input
            id="description-input"
            type="text"
            className="form-control"
            placeholder="e.g., Grocery shopping, Salary"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && <span className="error-msg">{errors.description}</span>}
        </div>

        {/* Amount & Date Fields */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div className="form-group">
            <label htmlFor="amount-input" className="form-label">Amount (₹)</label>
            <input
              id="amount-input"
              type="number"
              step="0.01"
              min="0"
              className="form-control"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            {errors.amount && <span className="error-msg">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="date-input" className="form-label">Date</label>
            <input
              id="date-input"
              type="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            {errors.date && <span className="error-msg">{errors.date}</span>}
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="form-group">
          <label htmlFor="category-input" className="form-label">Category</label>
          <select
            id="category-input"
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES[type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn" id="add-transaction-btn">
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
