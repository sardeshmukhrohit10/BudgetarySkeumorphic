import React from "react";
import "./ExpenseCard.css";

import foodIcon from "../assets/icons8-shopping-cart-32.png";
import healthIcon from "../assets/icons8-doctors-bag-50.png";
import travelIcon from "../assets/icons8-plane-60.png";
import rentIcon from "../assets/icons8-home-50.png";
import emergencyIcon from "../assets/icons8-emergency-50.png";
import educationIcon from "../assets/icons8-books-emoji-48.png";
import donationIcon from "../assets/icons8-donate-50.png";
import partyIcon from "../assets/icons8-beer-50.png";
import salaryIcon from "../assets/icons8-wallet-50.png";

function ExpenseCard({ category, transactions }) {
  const categoryIcons = {
    "Food & Groceries": foodIcon,
    "Health Insurance": healthIcon,
    "Travel Expenses": travelIcon,
    "Rent": rentIcon,
    "Emergency Expenses": emergencyIcon,
    "Education": educationIcon,
    "Donation": donationIcon,
    "Party": partyIcon,
    "Salary": salaryIcon,
  };

  const total = transactions
    .filter((txn) => txn.type === "Expense" && txn.category === category)
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  return (
    <div className="expense-card">
      <div className="expense-icon-wrapper">
        <img
          src={categoryIcons[category] || salaryIcon}
          alt={category}
          className="expense-icon"
        />
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
