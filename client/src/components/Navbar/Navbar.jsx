import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaUserCircle, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { RiCompassDiscoverLine } from 'react-icons/ri';
import './Navbar.css';

const Navbar = ({ setShowLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("authToken") || "");
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) setToken(storedToken);
  }, [token]);

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setToken("");
    navigate('/home');
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

        <ul className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="navbar-link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/trips" onClick={() => setMobileMenuOpen(false)} className="navbar-link">
              Trips
            </Link>
          </li>
          <li>
            <Link to="/guides" onClick={() => setMobileMenuOpen(false)} className="navbar-link">
              Guides
            </Link>
          </li>
        </ul>

        <div className="navbar-right">
          <div className="search-icon">
            <FaSearch />
          </div>

          {localStorage.getItem("authToken") ? (
            <div className="user-dropdown">
              <button className="user-button">
                <FaUserCircle />
              </button>
              <div className="dropdown-content">
                <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>Profile</Link>
                <button onClick={logout} className="logout-button">
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            </div>
          ) : (
            <button className="auth-button" onClick={() => {setShowLogin(true)
                    setToken(localStorage.getItem("authToken") || "");
            }}>
              <FaUserCircle /> Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;