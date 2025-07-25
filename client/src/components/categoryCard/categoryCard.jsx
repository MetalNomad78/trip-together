import React from "react";
import { useNavigate } from "react-router-dom";
import "./categoryCard.css";

const CategoryCard = ({ data }) => {
  const navigate = useNavigate();

  // Consistent with AddTripPopup's categories
  const categoriesMapping = {
    "Beach Getaway": "beach_getaway",
    "Mountain Escape": "mountain_escape",
    "Cultural Exploration": "cultural_exploration",
    "Wildlife Safari": "wildlife_safari",
    "Adventure Sports": "adventure_sports",
    "Spiritual Retreat": "spiritual_retreat",
    "Desert Expedition": "desert_expedition",
    "Backpacking Adventure": "backpacking_adventure"
  };

  const handleExplore = (e) => {
    e.stopPropagation();
    const apiCategory = categoriesMapping[data.title];
    if (apiCategory) {
      navigate(`/trips?category=${apiCategory}`);
    } else {
      navigate('/trips');
    }
  };

  return (
    <div 
      className="category-card"
      onClick={handleExplore}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${data.title} trips`}
      onKeyDown={(e) => e.key === 'Enter' && handleExplore(e)}
    >
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
        <button 
          className="explore-button"
          onClick={handleExplore}
          aria-label={`Explore ${data.title}`}
        >
          Explore
          <svg className="arrow-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;