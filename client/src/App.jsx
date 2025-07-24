import React, { useState } from "react";
// import Home from './pages/Home/Home'
import Landing from "./Pages/LandingPage/LandingPage";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home/Home";
import CategoryTrips from "./Pages/categoryTrips/CategoryTrips";
import GuideRegistration from "./Pages/guideRegistration/guideRegistration";
const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {/* <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        
        <Routes>
          <Route path='/' element={<Landing setShowLogin={setShowLogin}/>}/>
        </Routes>
      </div>
      <Footer />
    </> */}

      {/* <Home/> */}
      {/* <CategoryTrips /> */}
      <GuideRegistration />
    </>
  );
};

export default App;
