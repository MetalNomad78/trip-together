import React from 'react';
import './AboutTT.css';
import { contentData } from '../../assets/assets';

const AboutTT = () => {
  return (
    <div className="trip-together-section">
      {contentData.map((item, index) => (
        <div key={index} className={`trip-row ${index % 2 === 0 ? 'row-normal' : 'row-reverse'}`}>
          <div className="trip-text">
            <h2>{item.heading}</h2>
            <p>{item.paragraph}</p>
          </div>
          <div className="trip-img">
            <img src={item.img} alt={item.heading} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default AboutTT;
