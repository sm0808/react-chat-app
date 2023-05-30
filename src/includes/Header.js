// Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
      <div className="header">
        <NavLink to="/chat" className="nav-link">
          Chat
        </NavLink>
        <NavLink to="/expense" className="nav-link">
          Expense Tracker
        </NavLink>
      </div>
    );
  };

export default Header;
