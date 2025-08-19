import React from "react";
import "./ExpenseCard.css";
import { FaWallet } from "react-icons/fa";

function ExpenseCard({ category, transactions }) {
  const total = transactions
    .filter((txn) => txn.type === "Expense" && txn.category === category)
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  return (
    <div className="expense-card">
      <div className="expense-icon-wrapper">
        <FaWallet />
      </div>
      <div className="expense-details">
        <span className="badge">This month</span>
        <strong className="expense-title">{category}</strong>
        <p className="expense-amount">${total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ExpenseCard;
