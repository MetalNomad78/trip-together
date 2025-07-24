import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import CategoryCard from "../../components/categoryCard/categoryCard";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const trendingImagesRef = useRef(null);
  
  const trendingImages = [
    "/images/trip1.jpg",
    "/images/trip2.jpg",
    "/images/trip3.jpg",
  ];

  const categories = [
    { title: "Beach Getaway", image: "/images/beach.jpg", description: "Relax on sunny beaches." },
    { title: "Mountain Escape", image: "/images/mountain.jpg", description: "Breathe in the mountain air." },
    { title: "Historical Sites", image: "/images/history.jpg", description: "Walk through history." },
    { title: "Adventure Sports", image: "/images/adventure.jpg", description: "Thrill and adrenaline." },
  ];

  // Auto-scroll images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % trendingImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [trendingImages.length]);

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
        <button className="add-trip-btn">
          <span>+</span> Add Trip
        </button>
      </div>

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="image-carousel" ref={trendingImagesRef}>
          {trendingImages.map((src, index) => (
            <div 
              key={index} 
              className={`image-card-container ${index === currentImageIndex ? 'active' : ''}`}
            >
              <div 
                className="image-card" 
                style={{ 
                  backgroundImage: `url(${src})`,
                  animation: index === currentImageIndex ? 'zoomIn 3s ease-in-out' : 'none'
                }} 
              />
              <div className="image-overlay"></div>
              <div className="image-indicator">
                {trendingImages.map((_, i) => (
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
    </div>
  );
};

export default Home;