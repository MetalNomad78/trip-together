import React from "react";
import "./TripSuccessPopup.css";

const TripSuccessPopup = ({ trip, onClose }) => {
  if (!trip) return null;

  const {
    name,
    location,
    price,
    description,
    highlights,
    category,
    itenary,
    duration,
  } = trip;

  return (
    <div className="popup-overlay">
      <div className="trip-success-popup">
        <div className="popup-header">
          <h2>🎉 Trip Created Successfully!</h2>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="popup-content">
          <h3>{name}</h3>

          <p>
            <strong>📍 Location:</strong>{" "}
            {[location?.city, location?.state, location?.country]
              .filter(Boolean)
              .join(", ")}
          </p>

          <p>
            <strong>🕒 Duration:</strong> {duration || "N/A"}{" "}
            {/* ✅ New field */}
          </p>

          <p>
            <strong>💰 Price:</strong> {price}
          </p>

          <p>
            <strong>📝 Description:</strong> {description}
          </p>

          {highlights?.length > 0 && (
            <>
              <p>
                <strong>✨ Highlights:</strong>
              </p>
              <ul>
                {highlights.map((highlight, index) => (
                  <li key={index}>✅ {highlight}</li>
                ))}
              </ul>
            </>
          )}

          {itenary?.length > 0 && (
            <>
              <p>
                <strong>🗓️ Itinerary:</strong>
              </p>
              <ul>
                {itenary.map((dayPlan) => (
                  <li key={dayPlan._id}>
                    <strong>Day {dayPlan.day}:</strong>
                    <ul>
                      {dayPlan.activities.map((act, idx) => (
                        <li key={idx}>📌 {act}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="popup-actions">
          <button onClick={onClose} className="ok-btn">
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripSuccessPopup;
