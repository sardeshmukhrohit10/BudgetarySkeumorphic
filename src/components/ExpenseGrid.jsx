import React from "react";
import ExpenseCard from "./ExpenseCard";
import "./ExpenseGrid.css";

const categories = [
  "Emergency Expenses",
  "Education",
  "Travel Expenses",
  "Food & Groceries",
  "Donation",
  "Party",
  "Rent",
  "Salary",
  "Health Insurance"
];

function ExpenseGrid({ transactions }) {
  return (
    <div className="expense-grid">
      {categories.map((category, idx) => (
        <ExpenseCard key={idx} category={category} transactions={transactions} />
      ))}
    </div>
  );
}

export default ExpenseGrid;
