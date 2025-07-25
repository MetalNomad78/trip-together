import React, { useState } from 'react';
import './LoginPopup.css';
import { FaTimes, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin, onAuthSuccess }) => {
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const [mode, setMode] = useState("Login"); // "Login" or "Sign Up"
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Validate form
    if (!form.email || !form.password || (mode === "Sign Up" && !form.name)) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    setLoading(true);
    console.log('Submitting form:', { mode, email: form.email });

    try {
      const endpoint = mode === "Login" ? "/api/userLogin" : "/api/userSignup";
      console.log('Making request to:', `${API_URL}${endpoint}`);
      
      const requestData = mode === "Login" 
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const response = await axios.post(`${API_URL}${endpoint}`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('Response received:', response.data);
      const { data } = response;

      // Check if we have a token (indicates success)
      if (data.token) {
        // Store token and user info in localStorage
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userInfo', JSON.stringify({
          name: data.user?.name || form.name,
          email: data.user?.email || form.email
        }));

        toast.success(
          mode === "Login" 
            ? "Logged in successfully!" 
            : "Account created successfully!"
        );

        console.log('Authentication successful, calling onAuthSuccess...');
        
        // Reset form
        setForm({ name: "", email: "", password: "" });
        
        // Call the success handler from parent
        if (onAuthSuccess) {
          onAuthSuccess();
        }
        
      } else {
        console.error('Authentication failed:', data.message);
        toast.error(data.message || "Authentication failed");
      }
    } catch (err) {
      console.error('Request error:', err);
      
      let errorMessage = "An error occurred. Please try again.";
      
      if (err.code === 'ECONNABORTED') {
        errorMessage = "Request timeout. Please check your connection.";
      } else if (err.response) {
        errorMessage = err.response.data?.message || `Server error: ${err.response.status}`;
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      } else {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setMode(m => m === "Login" ? "Sign Up" : "Login");
    setForm({ name: "", email: "", password: "" });
  };

  const closePopup = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Closing popup via close button...');
    setShowLogin();
  };

  const handleOverlayClick = (e) => {
    // Only close if clicking the overlay itself, not its children
    if (e.target === e.currentTarget) {
      console.log('Closing popup via overlay click...');
      setShowLogin();
    }
  };

  return (
    <div className="login-popup-overlay" onClick={handleOverlayClick}>
      <div className="login-popup" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{mode}</h2>
            <button
              type="button"
              className="close-btn"
              onClick={closePopup}
              disabled={loading}
              aria-label="Close popup"
            >
              <FaTimes />
            </button>
          </div>

          {mode === "Sign Up" && (
            <div className="input-group">
              <FaUser className="input-icon" />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your name"
                required
                disabled={loading}
                autoComplete="name"
              />
            </div>
          )}

          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your email"
              required
              disabled={loading}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="Password (min 6 characters)"
              required
              disabled={loading}
              minLength={6}
              autoComplete={mode === "Login" ? "current-password" : "new-password"}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading || !form.email || !form.password || (mode === "Sign Up" && !form.name)}
            className="submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                {mode === "Login" ? "Logging in..." : "Creating Account..."}
              </>
            ) : mode === "Login" ? "Login" : "Create Account"}
          </button>

          <div className="login-popup-toggle">
            {mode === "Login" ? (
              <p>
                Don't have an account?{' '}
                <span 
                  onClick={toggleMode} 
                  className="toggle-link"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && toggleMode()}
                >
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <span 
                  onClick={toggleMode} 
                  className="toggle-link"
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && toggleMode()}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;