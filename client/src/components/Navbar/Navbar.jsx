import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMenu("home")}>
          <span className="logo-highlight">Trip</span>Together
        </Link>
        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              onClick={() => { setMenu("home"); setMobileMenuOpen(false); }} 
              className={`navbar-link ${menu === "home" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <a 
              href="#explore-menu" 
              onClick={() => { setMenu("menu"); setMobileMenuOpen(false); }} 
              className={`navbar-link ${menu === "menu" ? "active" : ""}`}
            >
              Destinations
            </a>
          </li>
          <li>
            <a 
              href="#app-download" 
              onClick={() => { setMenu("mob-app"); setMobileMenuOpen(false); }} 
              className={`navbar-link ${menu === "mob-app" ? "active" : ""}`}
            >
              Mobile App
            </a>
          </li>
          <li>
            <a 
              href="#footer" 
              onClick={() => { setMenu("contact"); setMobileMenuOpen(false); }} 
              className={`navbar-link ${menu === "contact" ? "active" : ""}`}
            >
              Contact
            </a>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-icon">
            <FaSearch />
          </div>

          {!token ? (
            <button 
              className="auth-button sign-in" 
              onClick={() => setShowLogin(true)}
            >
              <FaUserCircle /> Sign In
            </button>
          ) : (
            <button 
              className="auth-button logout" 
              onClick={logout}
            >
              <FaSignOutAlt /> Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
