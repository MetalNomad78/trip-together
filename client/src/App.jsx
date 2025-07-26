// App.jsx
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "./Pages/LandingPage/LandingPage";
import Home from "./Pages/Home/Home";
import CategoryTrips from "./Pages/categoryTrips/CategoryTrips";
import TripDetails from "./Pages/tripDetails/tripDetails";
import GuideRegistration from "./Pages/guideRegistration/guideRegistration";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GuidesListing from "./Pages/Guides/Guides";
import GetAllTrips from "./Pages/trips/Trips";
import MyTrips from "./Pages/MyTrips/MyTrips";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userInfo = localStorage.getItem("userInfo");

    if (token && userInfo) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Handle successful login/signup
  const handleAuthSuccess = () => {
    console.log("Authentication successful, closing popup and navigating...");
    setIsAuthenticated(true);
    setShowLogin(false);

    // Navigate to home page
    setTimeout(() => {
      navigate("/home", { replace: true });
    }, 100);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userInfo");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
  };

  // Close login popup
  const closeLoginPopup = () => {
    console.log("Closing login popup...");
    setShowLogin(false);
  };

  return (
    <div className="app-container">
      <Navbar
        setShowLogin={setShowLogin}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />

      <Routes>
        {/* Landing at "/" */}
        <Route path="/" element={<Landing setShowLogin={setShowLogin} />} />
        {/* Main app pages */}
        <Route path="/home" element={<Home />} />
        <Route path="/mytrips" element={<MyTrips />} />
        <Route path="/trips" element={<CategoryTrips />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        <Route path="/getAlltrips" element={<GetAllTrips />} />
        <Route path="/become-guide" element={<GuideRegistration />} />
        <Route path="/guides" element={<GuidesListing />} />
      </Routes>

      <Footer />

      {showLogin && (
        <LoginPopup
          setShowLogin={closeLoginPopup}
          onAuthSuccess={handleAuthSuccess}
        />
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default App;
