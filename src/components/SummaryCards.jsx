import React from "react";
import SummaryCard from "./SummaryCard";
import "./SummaryCards.css";

function SummaryCards({ summary }) {
  return (
    <div className="summary-cards">
      <SummaryCard type="balance" title="Total Balance" amount={`$${summary.balance}`} />
      <SummaryCard type="income" title="Income (This Month)" amount={`$${summary.income}`} />
      <SummaryCard type="expense" title="Expense (This Month)" amount={`$${summary.expense}`} />
    </div>
  );
}

export default SummaryCards;
