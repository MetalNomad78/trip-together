import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import CategoryCard from "../../components/categoryCard/categoryCard";
import AddTripPopup from "../../components/addTrip/addTrip";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const trendingImagesRef = useRef(null);
  const [showAddTripPopup, setShowAddTripPopup] = useState(false);
  
  const trendingTrips = [
    {
      image: "/images/trip1.jpg",
      title: "Himalayan Trek",
      description: "Experience the breathtaking beauty of snow-capped peaks"
    },
    {
      image: "/images/trip2.jpg",
      title: "Beach Paradise",
      description: "Relax on pristine sandy beaches with crystal clear waters"
    },
    {
      image: "/images/trip3.jpg",
      title: "Cultural Journey",
      description: "Explore ancient temples and rich cultural heritage"
    },
  ];

  const categories = [
    { title: "Beach Getaway", image: "/images/beach.jpg", description: "Relax on sunny beaches." },
    { title: "Mountain Escape", image: "/images/mountain.jpg", description: "Breathe in the mountain air." },
    { title: "Historical Sites", image: "/images/history.jpg", description: "Walk through history." },
    { title: "Adventure Sports", image: "/images/adventure.jpg", description: "Thrill and adrenaline." },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % trendingTrips.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingTrips.length]);

  useEffect(() => {
    if (trendingImagesRef.current) {
      const imageCard = trendingImagesRef.current.children[currentImageIndex];
      if (imageCard) {
        trendingImagesRef.current.scrollTo({
          left: imageCard.offsetLeft - 40,
          behavior: 'smooth'
        });
      }
    }
  }, [currentImageIndex]);

  return (
    <div className="home-container">
      <div className="header">
        <button className="add-trip-btn" onClick={() => setShowAddTripPopup(true)}>
          <span>+</span> Add Trip
        </button>
      </div>

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="image-carousel" ref={trendingImagesRef}>
          {trendingTrips.map((trip, index) => (
            <div 
              key={index} 
              className={`image-card-container ${index === currentImageIndex ? 'active' : ''}`}
            >
              <div 
                className="image-card" 
                style={{ 
                  backgroundImage: `url(${trip.image})`,
                  animation: index === currentImageIndex ? 'zoomIn 3s ease-in-out' : 'none'
                }} 
              />
              <div className="image-overlay"></div>
              <div className="trip-info">
                <h3 className="trip-title">{trip.title}</h3>
                <p className="trip-description">{trip.description}</p>
              </div>
              <div className="image-indicator">
                {trendingTrips.map((_, i) => (
                  <div 
                    key={i} 
                    className={`indicator-dot ${i === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(i)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Explore Categories</h2>
        <div className="categories-grid">
          {categories.map((category, idx) => (
            <CategoryCard key={idx} data={category} />
          ))}
        </div>
      </section>

      {showAddTripPopup && (
        <AddTripPopup 
          onClose={() => setShowAddTripPopup(false)}
          onSave={(tripData) => {
            console.log("New trip:", tripData);
            setShowAddTripPopup(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;