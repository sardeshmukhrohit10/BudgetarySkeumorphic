// Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { FaThLarge, FaFileAlt } from "react-icons/fa";
import DateBox from "./DateBox";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-top">
        <h1 className="logo">Budgetary</h1>
        <div className="nav-section">
          <NavLink to="/" className="nav-button">
            <FaThLarge />
            Dashboard
          </NavLink>
          <NavLink to="/transactions" className="nav-button">
            <FaFileAlt />
            Transaction History
          </NavLink>
        </div>
      </div>

      <div className="sidebar-date-box">
        <DateBox />
      </div>
    </div>
  );
}

export default Sidebar;
