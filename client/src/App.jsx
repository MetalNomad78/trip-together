import React, { useState } from 'react'
import Home from './pages/Home/Home'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import LoginPopup from './components/LoginPopup/LoginPopup'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {

  const [showLogin,setShowLogin] = useState(false);

  return (
    <>
    <ToastContainer/>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
      <div className='app'>
        
        <Routes>
          <Route path='/' element={<Home setShowLogin={setShowLogin}/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
