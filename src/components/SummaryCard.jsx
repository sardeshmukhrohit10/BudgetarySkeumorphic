import React from "react";
import "./SummaryCard.css";

import balanceIcon from "../assets/icons8-ledger-emoji-48.png";
import incomeIcon from "../assets/icons8-income-50.png";
import expenseIcon from "../assets/icons8-expense-50.png";

const iconMap = {
  balance: {
    icon: balanceIcon,
    bg: "icon-balance",
  },
  income: {
    icon: incomeIcon,
    bg: "icon-income",
  },
  expense: {
    icon: expenseIcon,
    bg: "icon-expense",
  },
};

const SummaryCard = ({ type, title, amount }) => {
  const config = iconMap[type];

  if (!config) {
    console.warn("Invalid type:", type);
    return null;
  }

  return (
    <div className={`summary-card ${type}`}>
      <div className={`icon-wrapper ${config.bg}`}>
        <img
          src={config.icon}
          alt={title}
          className="summary-icon"
        />
      </div>
      <div className="card-text">
        <p className="card-title">{title}</p>
        <h2 className="card-amount">{amount}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;
