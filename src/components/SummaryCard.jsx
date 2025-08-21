import React from "react";
import "./SummaryCard.css";
import { FaWallet, FaMoneyBillWave, FaFileInvoiceDollar } from "react-icons/fa";

const iconMap = {
  balance: {
    icon: <FaWallet />,
    bg: "icon-balance",
  },
  income: {
    icon: <FaMoneyBillWave />,
    bg: "icon-income",
  },
  expense: {
    icon: <FaFileInvoiceDollar />,
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
    <div className="summary-card">
      <div className={`icon-wrapper ${config.bg}`}>
        {config.icon}
      </div>
      <div className="card-text">
        <p className="card-title">{title}</p>
        <h2 className="card-amount">{amount}</h2>
      </div>
    </div>
  );
};

export default SummaryCard;