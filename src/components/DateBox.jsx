import React from "react";
import "./DateBox.css";

function DateBox() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="date-box">
      <span className="date-label">DATE</span>
      <p className="date-value">{today}</p>
    </div>
  );
}

export default DateBox;
