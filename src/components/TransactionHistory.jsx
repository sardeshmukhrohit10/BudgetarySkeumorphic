import React, { useState } from "react";
import SummaryCards from "./SummaryCards";
import AddTransactionModal from "./AddTransactionModal";
import "./TransactionHistory.css";

function TransactionHistory({ transactions, onAddTransaction, onDeleteTransaction, onEditTransaction }) {
  const [showModal, setShowModal] = useState(false);
  const [editingTxn, setEditingTxn] = useState(null);
  const [filter, setFilter] = useState("All");

  const income = transactions
    .filter(txn => txn.type === "Income")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const expense = transactions
    .filter(txn => txn.type === "Expense")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const balance = income - expense;

  const handleEdit = (txn) => {
    setEditingTxn(txn);
    setShowModal(true);
  };

  const filteredTransactions = transactions.filter((txn) => {
    if (filter === "Income") return txn.type === "Income";
    if (filter === "Expense") return txn.type === "Expense";
    return true;
  });

  return (
    <div className="dashboard-main">
      <div className="dashboard-header">
        <div>
          <h2>Welcome</h2>
          <p>Manage and view all your financial transactions</p>
        </div>
        <button className="add-transaction" onClick={() => { setEditingTxn(null); setShowModal(true); }}>
          + Add Transaction
        </button>
      </div>

      <SummaryCards summary={{ balance, income, expense }} />

      <div className="transaction-table">
        <div className="table-header">
          <input type="text" placeholder="Search transactions..." />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Transactions</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Description</th>
              <th>Date & Time</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((txn, i) => (
              <tr key={i}>
                <td>{txn.category}</td>
                <td>{txn.description || "—"}</td>
                <td>
                  {txn.date}
                  <br />
                  <span className="txn-time">{txn.time}</span>
                </td>
                <td className={txn.type === "Income" ? "amount-income" : "amount-expense"}>
                  {txn.type === "Income" ? `+€${txn.amount}` : `-€${txn.amount}`}
                </td>
                <td className="actions">
                  <span className="edit-btn" onClick={() => handleEdit(txn)}>📝</span>
                  <span className="delete-btn" onClick={() => onDeleteTransaction(txn)}>🗑️</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          onSubmit={(txn) => {
            if (editingTxn) {
              onEditTransaction(txn);
            } else {
              onAddTransaction(txn);
            }
            setShowModal(false);
            setEditingTxn(null);
          }}
          initialData={editingTxn}
        />
      )}
    </div>
  );
}

export default TransactionHistory;
