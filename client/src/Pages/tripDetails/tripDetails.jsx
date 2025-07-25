// src/Pages/tripDetails/TripDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./tripDetails.css";

const TripDetails = () => {
  const { id } = useParams();                 // <— matches /trip/:id
  const [trip, setTrip] = useState(null);
  const [guide, setGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // carousel state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const carouselRef = useRef(null);

  // chat mock state
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  // 1️⃣ Fetch trip details
  useEffect(() => {
    const fetchTripDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5600";
        const response = await axios.post(
          `${API_URL}/dbApis/getTripDetails`,
          { tripId: id },            // <— matches your curl
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );

        if (response.data?.status === "success") {
          setTrip(response.data.trip);
          setGuide(response.data.guide);
        } else {
          throw new Error(response.data?.message || "Trip not found");
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "Failed to load trip details");
      } finally {
        setLoading(false);
      }
    };

    fetchTripDetails();
  }, [id]);

  // 2️⃣ Simple image carousel auto‑advance
  useEffect(() => {
    if (!trip?.images?.length) return;
    const iv = setInterval(() => {
      setCurrentImageIndex(i => (i + 1) % trip.images.length);
    }, 3000);
    return () => clearInterval(iv);
  }, [trip]);

  // scroll carousel into view
  useEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.children;
      if (cards[currentImageIndex]) {
        carouselRef.current.scrollTo({
          left: cards[currentImageIndex].offsetLeft - 20,
          behavior: "smooth",
        });
      }
    }
  }, [currentImageIndex]);

  // 3️⃣ Scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 4️⃣ Handle chat send
  const onSend = e => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(m => [...m, msg]);
    setNewMessage("");

    // mock guide reply
    setTimeout(() => {
      setMessages(m => [
        ...m,
        {
          id: Date.now() + 1,
          text: "Thanks for reaching out! I'll get back to you soon.",
          sender: "guide",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }, 1000);
  };

  // 5️⃣ Handle registration
  const onRegister = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5600";
      const res = await axios.post(
        `${API_URL}/dbApis/registerForTrip`,
        { tripId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (res.data?.status === "success") {
        alert("Registered successfully!");
      } else {
        throw new Error(res.data?.message || "Registration failed");
      }
    } catch (err) {
      alert(err.message || "Could not register");
    }
  };

  // 6️⃣ Loading / error states
  if (loading) return <div className="trip-details-container">Loading…</div>;
  if (error) return <div className="trip-details-container error">{error}</div>;
  if (!trip) return null;

  // 7️⃣ Main render
  return (
    <div className="trip-details-container">
      {/* Carousel */}
      <section className="image-carousel-section">
        <div className="carousel" ref={carouselRef}>
          {trip.images.length
            ? trip.images.map((src, idx) => (
                <div
                  key={idx}
                  className={`carousel-card ${idx === currentImageIndex ? "active" : ""}`}
                  style={{ backgroundImage: `url(${src})` }}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))
            : (
              <div className="carousel-card" style={{ backgroundImage: `url(/images/default.jpg)` }} />
            )}
        </div>
      </section>

      {/* Info & Register */}
      <div className="info-register">
        <button onClick={onRegister} className="register-btn">Register for Trip</button>
        <h1>{trip.name}</h1>
        <p>{trip.description}</p>
        <ul>
          {trip.highlights?.map((h, i) => <li key={i}>• {h}</li>)}
        </ul>
      </div>

      {/* Guide Card */}
      {guide && (
        <aside className="guide-card">
          <img src={guide.image || "/images/default-guide.jpg"} alt={guide.name} />
          <h3>{guide.name}</h3>
          <p>{guide.experience} years • {guide.specialization}</p>
          <p>{guide.bio}</p>
        </aside>
      )}

      {/* Discussion */}
      <section className="discussion">
        <div className="messages">
          {messages.map(m => (
            <div key={m.id} className={`message ${m.sender}`}>
              <p>{m.text}</p>
              <span className="time">{m.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={onSend} className="message-form">
          <input
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            placeholder="Type a message…"
          />
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
};

export default TripDetails;
