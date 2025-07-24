import React from 'react';
import './MostVisited.css';
import { mostVisitedData } from '../../assets/assets';

const MostVisited = () => {
  return (
    <div className="most-visited-section">
      <h2 className="section-title">Most Visited Places Recently</h2>
      <div className="card-grid">
        {mostVisitedData.map((place, index) => (
          <div className="place-card" key={index}>
            <img src={place.img} alt={place.name} className="place-img" />
            <div className="place-info">
              <h3>{place.name}</h3>
              <div className="stars">⭐ {place.rating}</div>
              <p className="desc">{place.description}</p>
              <p className="visitors">👥 {place.visitors}</p>
            </div>
            <button className="explore-btn">Explore</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostVisited;
