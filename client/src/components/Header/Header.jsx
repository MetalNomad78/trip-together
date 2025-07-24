import React, { useEffect, useState } from 'react';
import './Header.css';
import { landing_clips } from '../../assets/assets';
import Navbar from '../Navbar/Navbar';

// Replace with your actual video paths (keep in public/videos folder or adjust accordingly)


const Header = ({setShowLogin}) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const fullText = 'Plan Trips That Matter — Real People, Real Adventures';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % landing_clips.length);
    }, 2000); // Change video every 10s
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayedText(''); // Reset before retyping
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(prev => prev + fullText[i++]);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []); // Re-trigger typewriter when video changes

  return (
  <>  <div className="header">
        <div><Navbar setShowLogin={setShowLogin}/></div>
      <video
        key={currentVideoIndex} // forces re-render
        className="video-bg"
        src={landing_clips[currentVideoIndex]}
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="overlay"></div>

      <div className="header-contents">
        <h5 className="typing-text">
          {displayedText}
          <span className="cursor">|</span>
        </h5> </div>
 
    </div>
     <div className='para'><p>Discover hidden gems, make new travel companions, and explore the world together — all in one place. Your next unforgettable adventure starts here.</p>
        <button>Start Exploring</button></div> </>
  );
};

export default Header;
