import React, { useEffect, useState } from "react";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

import "react-loading-skeleton/dist/skeleton.css";
import "./MyTrips.css"; // Add styles here if needed

const MyTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getUserEmail = () => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      try {
        const parsed = JSON.parse(userInfo);
        return parsed.email;
      } catch (err) {
        console.error("Error parsing userInfo:", err);
      }
    }
    return null;
  };

  const getLocationString = (trip) => {
    if (typeof trip.location === "string") return trip.location;
    if (trip.location?.city && trip.location?.state) {
      return `${trip.location.city}, ${trip.location.state}`;
    }
    return "Location not specified";
  };

  useEffect(() => {
    const fetchTrips = async () => {
      const email = getUserEmail();
      if (!email) {
        navigate("/");
        return;
      }

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/dbApis/getTripsForUser`,
          { email }
        );
        setTrips(response?.data || []);
      } catch (error) {
        console.error("Failed to fetch user trips:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, []);

  return (
    <div className="my-trips-container">
      <h2>My Trips</h2>

      {loading ? (
        <Skeleton count={3} height={150} style={{ marginBottom: "1rem" }} />
      ) : trips.length === 0 ? (
        <p>No trips found.</p>
      ) : (
        <div className="trips-grid">
          {trips.map((trip) => (
            <div key={trip._id} className="category-trip-card">
              <div className="trip-image-container">
                <img
                  src={trip.imageUrl || "/images/default-trip.jpg"}
                  alt={trip.name}
                  className="trip-image"
                  loading="lazy"
                />
                <div className="image-overlay"></div>
              </div>

              <div className="trip-content">
                <div className="trip-header">
                  <h3 className="trip-name">{trip.name}</h3>
                  <span className="trip-price">
                    {trip.price || "Price not specified"}
                  </span>
                </div>

                <p className="trip-description">
                  {trip.description || "No description available"}
                </p>

                <div className="trip-meta">
                  <span className="meta-item">
                    <i className="fas fa-map-marker-alt"></i>{" "}
                    {getLocationString(trip)}
                  </span>
                  <span className="meta-item">
                    <i className="fas fa-users"></i> {trip.users?.length || 0}{" "}
                    registered
                  </span>
                  {trip.duration && (
                    <span className="meta-item">
                      <i className="fas fa-clock"></i> {trip.duration}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
