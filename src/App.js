import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import ExpenseGrid from "./components/ExpenseGrid";
import RecentTransactions from "./components/RecentTransactions";
import AddTransactionModal from "./components/AddTransactionModal";
import TransactionHistory from "./components/TransactionHistory";

import TaskPanel from "./components/TaskPanel";
import { initStudy, installCustomEventBridges } from "./studylogger";

import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initStudy();
    installCustomEventBridges();
  }, []);

  const income = useMemo(
    () => transactions
      .filter((txn) => txn.type === "Income")
      .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0),
    [transactions]
  );

  const expense = useMemo(
    () => transactions
      .filter((txn) => txn.type === "Expense")
      .reduce((sum, txn) => sum + parseFloat(txn.amount || 0), 0),
    [transactions]
  );

  const balance = income - expense;

  const addTransaction = (newTxn) => {
    try {
      const amt = Number(newTxn?.amount);
      const descOk = typeof newTxn?.description === "string" && newTxn.description.trim().length > 0;
      const typeOk = newTxn?.type === "Income" || newTxn?.type === "Expense";
      const amtOk = !Number.isNaN(amt) && Number.isFinite(amt);

      if (!descOk || !typeOk || !amtOk) {
        window.dispatchEvent(new Event("study:add_err"));
        setShowModal(false);
        return;
      }

      const withId = newTxn.id ? newTxn : { ...newTxn, id: (crypto?.randomUUID?.() ?? Date.now().toString()) };
      setTransactions((prev) => [...prev, withId]);
      window.dispatchEvent(new Event("study:add_ok"));
      setShowModal(false);
    } catch {
      window.dispatchEvent(new Event("study:add_err"));
      setShowModal(false);
    }
  };

  const editTransaction = (updatedTxn) => {
    try {
      const amt = Number(updatedTxn?.amount);
      const descOk = typeof updatedTxn?.description === "string" && updatedTxn.description.trim().length > 0;
      const typeOk = updatedTxn?.type === "Income" || updatedTxn?.type === "Expense";
      const amtOk = !Number.isNaN(amt) && Number.isFinite(amt);

      if (!descOk || !typeOk || !amtOk) {
        window.dispatchEvent(new Event("study:edit_err"));
        return;
      }

      setTransactions((prev) => prev.map((txn) => (txn.id === updatedTxn.id ? updatedTxn : txn)));
      window.dispatchEvent(new Event("study:edit_ok"));
    } catch {
      window.dispatchEvent(new Event("study:edit_err"));
    }
  };

  const deleteTransaction = (txnToDelete) => {
    try {
      setTransactions((prev) => prev.filter((txn) => txn !== txnToDelete));
      window.dispatchEvent(new Event("study:delete_ok"));
    } catch {
      window.dispatchEvent(new Event("study:delete_err"));
    }
  };

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
                    <SummaryCards
                      summary={{ balance, income, expense }}
                      onAddClick={() => setShowModal(true)}
                    />
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
                    onDeleteTransaction={deleteTransaction}
                    onEditTransaction={editTransaction}
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

        <TaskPanel />
    </Router>
  );
}

export default App;
