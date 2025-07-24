import React from "react";
import "./CategoryTrips.css";

const CategoryIntroCard = ({ trip }) => {
  return (
    <div className="trip-card">
      <div className="trip-image-container">
        <img src={trip.image} alt={trip.description} className="trip-image" />
        <div className="trip-overlay"></div>
      </div>
      <div className="trip-content">
        <p className="trip-description">{trip.description}</p>
        <div className="trip-meta">
          <span className="users-count">
            <i className="fas fa-users"></i> {trip.usersRegistered}
          </span>
          <span className="location">
            <i className="fas fa-map-marker-alt"></i> {trip.city}, {trip.state}
          </span>
        </div>
        <button className="explore-btn">Explore</button>
      </div>
    </div>
  );
};

const CategoryTrips = () => {
  const trips = [
    {
      id: 1,
      image: "/images/trip1.jpg",
      description: "Scenic beach escape with sunrise views",
      usersRegistered: 42,
      state: "Goa",
      city: "Panaji",
    },
    {
      id: 2,
      image: "/images/trip2.jpg",
      description: "Trek through the beautiful Himalayas",
      usersRegistered: 58,
      state: "Himachal Pradesh",
      city: "Manali",
    },
    {
      id: 3,
      image: "/images/trip3.jpg",
      description: "Historical exploration of ancient ruins",
      usersRegistered: 30,
      state: "Madhya Pradesh",
      city: "Khajuraho",
    },
    {
      id: 4,
      image: "/images/trip4.jpg",
      description: "Adventure trip for river rafting & camping",
      usersRegistered: 73,
      state: "Uttarakhand",
      city: "Rishikesh",
    },
    {
      id: 5,
      image: "/images/trip5.jpg",
      description: "Wildlife safari in dense national park",
      usersRegistered: 25,
      state: "Rajasthan",
      city: "Ranthambore",
    },
    {
      id: 6,
      image: "/images/trip6.jpg",
      description: "Cultural tour of vibrant local markets",
      usersRegistered: 38,
      state: "Kerala",
      city: "Kochi",
    },
  ];

  return (
    <div className="category-trips-container">
      <div className="category-header">
        <h2>Explore Amazing Trips</h2>
        <p className="subtitle">Discover curated experiences across India</p>
      </div>
      <div className="trips-grid">
        {trips.map((trip) => (
          <CategoryIntroCard key={trip.id} trip={trip} />
        ))}
      </div>
    </div>
  );
};

export default CategoryTrips;