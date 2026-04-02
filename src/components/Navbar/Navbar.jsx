


import React, { useState } from "react";
import "./Navbar.css";
import logo_png from "./pro_logo.png";
import { Link, Navigate } from "react-router-dom";
import { getCurrentUser,isAuthenticated} from '../login/Auth';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
const currentUser = getCurrentUser();
const [open, setOpen] = useState(false);

const navigate = useNavigate();

const canEdit =
  currentUser &&
  (currentUser.userType === 'admin');
const canSell =
  currentUser &&
  (currentUser.userType === 'seller' || currentUser.userType === 'admin');
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setPropertiesOpen(false);
    setAdminOpen(false);
  };

  const toggleProperties = (e) => {
    e.preventDefault();
    setPropertiesOpen(!propertiesOpen);
  };

  const toggleAdmin = (e) => {
    e.preventDefault();
    setAdminOpen(!adminOpen);
  };

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
    >
      <div className="logo">
        <img src={logo_png} alt="Propertia Logo" />
        <span>Propertia</span>
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={closeMenu}>Home</Link>
        </li>
        
        <li className={`dropdown ${propertiesOpen ? "active" : ""}`}>
          <a onClick={toggleProperties}>Properties ▾</a>
          <ul className="dropdown-menu">
           <li><Link to="/explore_property?type=House">House</Link></li>
             <li><Link to="/explore_property?type=Apartment">Apartment</Link></li>
             <li><Link to="/explore_property?type=PG">PG / Rental</Link></li>
             <li><Link to="/explore_property?type=Office">Office</Link></li>
             <li><Link to="/explore_property?type=Shop">Shop</Link></li>
            <li><Link to="/explore_property?type=Land">Land / Plot</Link></li>
          </ul>
        </li>
        {canEdit && (
        <li className={`dropdown ${adminOpen ? "active" : ""}`}>
          <a onClick={toggleAdmin}>Admin ▾</a>
          <ul className="dropdown-menu">
            <li><Link to="/View_All_Categories" onClick={closeMenu}>View All Categories</Link></li>
            <li><Link to="/View_All_Amenities" onClick={closeMenu}>View All Amenities</Link></li>
          </ul>
        </li>
        )}
        <li>
          <Link to="/explore_property" onClick={closeMenu}>Buy</Link>
        </li>
        {canSell && (
        <li>
          <Link to="/sell_rent" onClick={closeMenu}>Sell / Rent out</Link>
        </li>
        )}
        <div className="auth">
  {isAuthenticated() ? (
    <div className="user-profile" onClick={() => setOpen(!open)}>
  <div className="avatar">
    {getCurrentUser()?.name?.charAt(0).toUpperCase()}
  </div>

  <span className="user-name">
    {getCurrentUser()?.name}
  </span>

  {open && (
    <div className="user-dropdown">
      <button onClick={() => navigate('/profile')}>Profile</button>
      <button
        className="logout"
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  )}
</div>

  ) : (
    <>
      <button
        className="login-btn"
        onClick={() => {
          closeMenu();
          navigate('/Auth');
        }}
      >
        Login
      </button>

      <button className="signup-btn" onClick={closeMenu}>
        Sign Up
      </button>
    </>
  )}
</div>

      </ul>

      <div className="menu-icon" onClick={toggleMenu}>
        ☰
      </div>
    </motion.nav>
  );
}