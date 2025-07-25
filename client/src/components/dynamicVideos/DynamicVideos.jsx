import React, { useEffect, useState } from 'react';
import './DynamicVideos.css';
import { landing_clips } from '../../assets/assets';
import Navbar from '../Navbar/Navbar';

const DynamicVideos = ({ setShowLogin }) => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const fullText = 'Plan Trips That Matter — Real People, Real Adventures';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex(prev => (prev + 1) % landing_clips.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let i = 0;
    setDisplayedText('');
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(prev => prev + fullText[i++]);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="dynamic-videos">
      <video
        key={currentVideoIndex}
        className={`video-bg ${isVideoLoaded ? 'loaded' : ''}`}
        src={landing_clips[currentVideoIndex]}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setIsVideoLoaded(true)}
      />
      <div className="overlay"></div>
      <div className="gradient-overlay"></div>

      <div className="video-contents">
        <h1 className="typing-text">
          {displayedText}
          <span className="cursor">|</span>
        </h1>
      </div>
    </div>
  );
};

export default DynamicVideos;