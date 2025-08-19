// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import ExpenseGrid from "./components/ExpenseGrid";
import RecentTransactions from "./components/RecentTransactions";
import AddTransactionModal from "./components/AddTransactionModal";
import TransactionHistory from "./components/TransactionHistory"; // ⬅️ Add this

import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addTransaction = (newTxn) => {
    setTransactions((prev) => [...prev, newTxn]);
    setShowModal(false);
  };

  const income = transactions
    .filter((txn) => txn.type === "Income")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const expense = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const balance = income - expense;

  return (
    <Router>
      <div className="dashboard-container">
        <Sidebar />

        <main className="dashboard-main">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="dashboard-header">
                    <div>
                      <h2>Welcome</h2>
                      <p>Here’s your financial overview for today</p>
                    </div>
                    <button
                      className="add-transaction"
                      onClick={() => setShowModal(true)}
                    >
                      + Add Transaction
                    </button>
                  </div>

                  <SummaryCards summary={{ balance, income, expense }} />

                  <div className="dashboard-body">
                    <ExpenseGrid transactions={transactions} />
                    <RecentTransactions transactions={transactions} />
                  </div>
                </>
              }
            />

            <Route
              path="/transactions"
              element={
                <TransactionHistory
                  transactions={transactions}
                  onAddTransaction={addTransaction}
                />
              }
            />
          </Routes>

          {showModal && (
            <AddTransactionModal
              onClose={() => setShowModal(false)}
              onSubmit={addTransaction}
            />
          )}
        </main>
      </div>
    </Router>
  );
}

export default App;
