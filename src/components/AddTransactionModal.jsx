import React, { useState, useEffect } from "react";
import "./AddTransactionModal.css";

function AddTransactionModal({ onClose, onSubmit, initialData }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  // Pre-fill when editing
  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description ?? "");
      setAmount(String(initialData.amount ?? ""));
      setCategory(initialData.category ?? "");
      setType(initialData.type ?? "Expense");
      setDate(initialData.date ?? new Date().toISOString().split("T")[0]);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      id: initialData?.id || Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date,
      time:
        initialData?.time ||
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (typeof onSubmit === "function") onSubmit(newTransaction);
    onClose();
  };

  const isEdit = Boolean(initialData);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
        <p>
          {isEdit
            ? "Edit your transaction details."
            : "Add a new income or expense transaction to track your finances."}
        </p>

        <form onSubmit={handleSubmit}>
          <label>Description</label>
          <input
            type="text"
            placeholder="Enter transaction description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label>Amount (€)</label>
          <input
            type="number"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option>Food & Groceries</option>
            <option>Health Insurance</option>
            <option>Travel Expenses</option>
            <option>Rent</option>
            <option>Emergency Expenses</option>
            <option>Education</option>
            <option>Donation</option>
            <option>Party</option>
            <option>Salary</option>
          </select>

          <label>Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <option>Expense</option>
            <option>Income</option>
          </select>

          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {isEdit ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTransactionModal;
