import React, { useState } from 'react';
import DynamicVideos from '../../components/dynamicVideos/DynamicVideos';
import AboutTT from '../../components/AboutTT/AboutTT';
import MostVisited from '../../components/MostVisited/MostVisited';
import './LandingPage.css';

const Landing = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");

  return (
    <div className="landing-page">
      <DynamicVideos setShowLogin={setShowLogin} />
      <div className="landing-content">
        <AboutTT />
        <MostVisited category={category} setCategory={setCategory} />
      </div>
    </div>
  );
};

export default Landing;