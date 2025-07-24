import React, { useState, useEffect, useRef } from "react";
import "./tripDetails.css";

const TripDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);
  const tripImagesRef = useRef(null);
  
  
  const tripImages = [
    "/images/trip1.jpg",
    "/images/trip2.jpg",
    "/images/trip3.jpg",
  ];

  const tripDetails = {
    name: "Himalayan Trekking Adventure",
    location: "Manali, Himachal Pradesh",
    duration: "5 Days / 4 Nights",
    difficulty: "Moderate",
    price: "₹12,999 per person",
    description: "Experience the breathtaking beauty of the Himalayas with our guided trekking adventure. This moderate-level trek takes you through lush forests, mountain streams, and offers spectacular views of snow-capped peaks. Perfect for adventure enthusiasts looking for a challenging yet rewarding experience.",
    highlights: [
      "Guided trek to Hampta Pass",
      "Camping under the stars",
      "Visit to Chandratal Lake",
      "Local cuisine experience",
      "Professional photography included"
    ]
  };

  const guideDetails = {
    name: "Rajesh Kumar",
    experience: "8 years",
    rating: "4.9/5 (127 reviews)",
    specialization: "Mountain Treks & Adventure Sports",
    image: "/images/guide.jpg",
    bio: "Certified mountaineer with extensive experience in Himalayan treks. Passionate about outdoor education and sustainable tourism."
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(prev => (prev + 1) % tripImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [tripImages.length]);

  useEffect(() => {
    if (tripImagesRef.current) {
      const imageCard = tripImagesRef.current.children[currentImageIndex];
      if (imageCard) {
        tripImagesRef.current.scrollTo({
          left: imageCard.offsetLeft - 40,
          behavior: 'smooth'
        });
      }
    }
  }, [currentImageIndex]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage("");

    setTimeout(() => {
      const reply = {
        id: messages.length + 2,
        text: "Thanks for your message! I'll get back to you shortly with more details about the trip.",
        sender: "guide",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="trip-details-container">

      <section className="trending-section">
        <h2 className="section-title">Trending Now</h2>
        <div className="image-carousel" ref={tripImagesRef}>
          {tripImages.map((src, index) => (
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
                {tripImages.map((_, i) => (
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

      <div className="trip-content-container">
        <div className="trip-info-section">
        <button className="add-trip-btn">
          <span>+</span> Register for Trip
        </button>
          <div className="trip-header">
            <h1 className="trip-title">{tripDetails.name}</h1>
            <div className="trip-meta">
              <span><i className="fas fa-map-marker-alt"></i> {tripDetails.location}</span>
              <span><i className="fas fa-calendar-alt"></i> {tripDetails.duration}</span>
              <span><i className="fas fa-bolt"></i> {tripDetails.difficulty}</span>
              <span><i className="fas fa-rupee-sign"></i> {tripDetails.price}</span>
            </div>
          </div>

          <div className="trip-description">
            <h3>About This Trip</h3>
            <p>{tripDetails.description}</p>
            
            <h3>Trip Highlights</h3>
            <ul className="trip-highlights">
              {tripDetails.highlights.map((highlight, index) => (
                <li key={index}><i className="fas fa-check-circle"></i> {highlight}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="guide-section">
          <div className="guide-card">
            <div className="guide-header">
              <h3>Your Guide</h3>
              <div className="guide-rating">
                <i className="fas fa-star"></i> {guideDetails.rating}
              </div>
            </div>
            <div className="guide-profile">
              <img src={guideDetails.image} alt={guideDetails.name} className="guide-image" />
              <div className="guide-info">
                <h4>{guideDetails.name}</h4>
                <p><i className="fas fa-award"></i> {guideDetails.experience} years experience</p>
                <p><i className="fas fa-mountain"></i> {guideDetails.specialization}</p>
              </div>
            </div>
            <p className="guide-bio">{guideDetails.bio}</p>
            <button className="contact-guide-btn">
              <i className="fas fa-envelope"></i> Contact Guide
            </button>
          </div>
        </div>
      </div>

      <div className="discussion-section">
        <h3>Discussion</h3>
        <div className="chat-container">
          <div className="messages-container">
            {messages.length === 0 ? (
              <div className="empty-chat">
                <i className="fas fa-comments"></i>
                <p>Start a conversation with your guide</p>
              </div>
            ) : (
              messages.map(message => (
                <div key={message.id} className={`message ${message.sender}`}>
                  <div className="message-content">
                    <p>{message.text}</p>
                    <span className="message-time">{message.time}</span>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSendMessage} className="message-input">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
            />
            <button type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;