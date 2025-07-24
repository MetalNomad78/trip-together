import React from "react";
import "./LandingPage.css";

const categories = [
  {
    emoji: "🏔️",
    title: "Hill Stations",
    examples: ["Manali", "Shimla", "Munnar"],
  },
  {
    emoji: "🕌",
    title: "Temples & Pilgrimage",
    examples: ["Varanasi", "ISKCON", "Tirupati"],
  },
  {
    emoji: "🏖️",
    title: "Beaches",
    examples: ["Goa", "Gokarna", "Pondicherry"],
  },
  {
    emoji: "🛍️",
    title: "Shopping & Malls",
    examples: ["Phoenix Mall", "Select City", "LuLu Mall"],
  },
  {
    emoji: "🎢",
    title: "Amusement Parks",
    examples: ["Imagica", "Wonderla", "Essel World"],
  },
  {
    emoji: "🎨",
    title: "Cultural Events",
    examples: ["Kala Ghoda", "Surajkund Mela", "Rajasthan Fair"],
  },
  {
    emoji: "🎶",
    title: "Music & Art Festivals",
    examples: ["Ziro", "NH7", "Sunburn"],
  },
  {
    emoji: "🌲",
    title: "Forests & Wildlife",
    examples: ["Jim Corbett", "Gir", "Kaziranga"],
  },
  {
    emoji: "🏯",
    title: "Forts & Heritage",
    examples: ["Jaipur", "Hampi", "Udaipur"],
  },
  {
    emoji: "🧘",
    title: "Wellness & Yoga",
    examples: ["Rishikesh", "Auroville", "Goa Retreats"],
  },
  {
    emoji: "🍜",
    title: "Food Trips",
    examples: ["Indore", "Lucknow", "Delhi 6"],
  },
  {
    emoji: "🚣",
    title: "Adventure Sports",
    examples: ["Bir", "Rishikesh", "Auli"],
  },
];

const LandingPage = () => {
  return (
    <section className="trending-section">
      <h2 className="section-title">Trending Destinations</h2>
      <div className="grid-container">
        {categories.map((cat, idx) => (
          <div key={idx} className="card">
            <div className="card-emoji">{cat.emoji}</div>
            <div className="card-title">{cat.title}</div>
            <div className="card-hover">
              <span>{cat.examples.join(", ")}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LandingPage;
