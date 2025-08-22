import React from "react";
import SummaryCard from "./SummaryCard";
import "./SummaryCards.css";

function SummaryCards({
  summary = { balance: 0, income: 0, expense: 0 },
  onAddClick,
  title = "Welcome",
  subtitle = "Here’s your financial overview for today",
}) {
  const { balance = 0, income = 0, expense = 0 } = summary;

  return (
    <section className="summary-cards">
      <div className="summary-header">
        <div className="summary-copy">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>

        {onAddClick && (
          <button className="add-transaction" onClick={onAddClick}>
            + Add Transaction
          </button>
        )}
      </div>

      <div className="summary-row">
        <SummaryCard
          type="balance"
          title="Total Balance"
          amount={`€${Number(balance).toFixed(2)}`}
        />
        <SummaryCard
          type="income"
          title="Income (This Month)"
          amount={`€${Number(income).toFixed(2)}`}
        />
        <SummaryCard
          type="expense"
          title="Expense (This Month)"
          amount={`€${Number(expense).toFixed(2)}`}
        />
      </div>
    </section>
  );
}

export default SummaryCards;
