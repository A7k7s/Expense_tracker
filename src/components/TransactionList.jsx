import React from 'react';
import TransactionItem from './TransactionItem';

/**
 * TransactionList Component
 * Renders list of filtered transactions or empty state when empty.
 */
const TransactionList = ({ transactions = [], onDeleteTransaction }) => {
  if (transactions.length === 0) {
    return (
      <div className="empty-state" id="empty-state">
        <div className="empty-icon">💸</div>
        <h4 className="empty-title">No transactions found</h4>
        <p className="empty-desc">
          Add a new transaction or try adjusting your filter and search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="transaction-list" id="transaction-list">
      {transactions.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          onDeleteTransaction={onDeleteTransaction}
        />
      ))}
    </div>
  );
};

export default TransactionList;
