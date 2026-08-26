import React, { useState, useEffect } from 'react';
import Summary from './components/Summary';
import ExpenseForm from './components/ExpenseForm';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';

const LOCAL_STORAGE_KEY = 'mini_expense_tracker_transactions';

function App() {
  // 1. Transactions State initialized from localStorage (defaults to [] if empty)
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load transactions from localStorage', e);
    }
    return [];
  });

  // 2. Filter & Search State
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // 3. useEffect to persist transactions to localStorage whenever transactions change
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    } catch (e) {
      console.error('Failed to save transactions to localStorage', e);
    }
  }, [transactions]);

  // 4. Handler to add a new transaction
  const handleAddTransaction = (newTransaction) => {
    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // 5. Handler to delete a transaction by ID
  const handleDeleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  // 6. Derived State using Array.reduce for financial summary calculations
  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const totalExpenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, curr) => acc + Number(curr.amount), 0);

  const currentBalance = totalIncome - totalExpenses;

  // Extract unique categories from current transactions for filter dropdown
  const allCategories = Array.from(
    new Set(transactions.map((t) => t.category))
  ).sort();

  // 7. Derived State using Array.filter for search & filter logic
  const filteredTransactions = transactions.filter((item) => {
    // Type filter check
    const matchesType = filterType === 'all' || item.type === filterType;

    // Category filter check
    const matchesCategory =
      filterCategory === 'all' || item.category === filterCategory;

    // Search query check (case-insensitive description matching)
    const matchesSearch = item.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());

    return matchesType && matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <h1 className="app-title">💸 Mini Expense Tracker</h1>
        <p className="app-subtitle">
          Track your income, manage expenses, and keep your balance in check
        </p>
      </header>

      {/* Summary Cards */}
      <Summary
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        currentBalance={currentBalance}
      />

      {/* Main Grid: Form on Left, Filter & List on Right */}
      <main className="main-grid">
        {/* Left Column: Form */}
        <section aria-label="Add Transaction Form">
          <ExpenseForm onAddTransaction={handleAddTransaction} />
        </section>

        {/* Right Column: Filter Controls & Transactions List */}
        <section className="glass-card" aria-label="Transaction History">
          <h3 className="section-title">
            📋 Transactions ({filteredTransactions.length})
          </h3>

          <FilterBar
            filterType={filterType}
            setFilterType={setFilterType}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            allCategories={allCategories}
          />

          <TransactionList
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
