import React from "react";
import "./ExpenseCard.css";

// Import icons for categories (skeuomorphic-style icons from react-icons)
import { FaWallet, FaUtensils, FaBook, FaPlane, FaHome, FaMedkit, FaGift, FaBeer, FaDonate } from "react-icons/fa";

function ExpenseCard({ category, transactions }) {
  // Map category to corresponding icon component
  const categoryIcons = {
    "Food & Groceries": <FaUtensils />,
    "Health Insurance": <FaMedkit />,
    "Travel Expenses": <FaPlane />,
    "Rent": <FaHome />,
    "Emergency Expenses": <FaGift />,
    "Education": <FaBook />,
    "Donation": <FaDonate />,
    "Party": <FaBeer />,
    "Salary": <FaWallet />, // Keep wallet for income or default
  };

  const total = transactions
    .filter((txn) => txn.type === "Expense" && txn.category === category)
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  return (
    <div className="expense-card">
      <div className="expense-icon-wrapper">
        {categoryIcons[category] || <FaWallet />} {/* Fallback icon */}
      </div>
      <div className="expense-details">
        <span className="badge">This month</span>
        <strong className="expense-title">{category}</strong>
        <p className="expense-amount">€{total.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ExpenseCard;
