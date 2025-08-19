import React from "react";
import "./RecentTransactions.css";

function RecentTransactions({ transactions = [] }) {
  return (
    <div className="transactions-box">
      <h3>Recent Transactions</h3>

      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions to show.</p>
      ) : (
        transactions.map((t, i) => (
          <div className="transaction" key={i}>
            <div>
              <strong className="txn-category">{t.category}</strong>
              <p>{t.date} | {t.time}</p>
            </div>
            <span className="txn-amount">€{t.amount}</span>
          </div>
        ))
      )}
    </div>
  );
}

export default RecentTransactions;
