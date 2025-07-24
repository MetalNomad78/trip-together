import React from "react";
import "./categoryCard.css";

const CategoryCard = ({ data }) => {
  return (
    <div className="category-card">
      <div className="card-image-container">
        <img 
          src={data.image} 
          alt={data.title} 
          loading="lazy"
          className="card-image"
        />
        <div className="image-overlay"></div>
      </div>
      <div className="card-info">
        <h3 className="card-title">{data.title}</h3>
        <p className="card-description">{data.description}</p>
        <button className="explore-button">
          Explore
          <svg className="arrow-icon" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;