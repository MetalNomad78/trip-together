import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaUserCircle,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { RiCompassDiscoverLine } from "react-icons/ri";
import "./Navbar.css";

const Navbar = ({ setShowLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const navigate = useNavigate();

 useEffect(() => {
   const updateToken = () => {
     const storedToken = localStorage.getItem("authToken");
     setToken(storedToken || "");
   };

   // Run on mount
   updateToken();

   // Listen to custom event
   window.addEventListener("authChanged", updateToken);

   return () => {
     window.removeEventListener("authChanged", updateToken);
   };
 }, []);
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setToken("");
    navigate("/");
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <RiCompassDiscoverLine className="logo-icon" />
          <span>TripTogether</span>
        </Link>

        <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <ul className={`navbar-menu ${mobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link
              to="/home"
              onClick={() => setMobileMenuOpen(false)}
              className="navbar-link"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/getAlltrips"
              onClick={() => setMobileMenuOpen(false)}
              className="navbar-link"
            >
              Trips
            </Link>
          </li>
          <li>
            <Link
              to="/guides"
              onClick={() => setMobileMenuOpen(false)}
              className="navbar-link"
            >
              Guides
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-icon">
            <FaSearch />
          </div>

          {token ? (
            <div className="user-dropdown">
              <button
                className="user-button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <FaUserCircle />
              </button>
              <div className="dropdown-content">
                <Link
                  to="/mytrips"
                  onClick={() => setMobileMenuOpen(false)}
                  className="dropdown-item"
                >
                  My Trips
                </Link>
                <Link to="/" onClick={logout} className="dropdown-item">
                  Logout <FaSignOutAlt />
                </Link>
              </div>
            </div>
          ) : (
            <button
              className="auth-button sign-in"
              onClick={() => {
                setShowLogin(true);
              }}
            >
              <FaUserCircle /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
