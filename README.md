# 🌍 Trip Together

Plan personalized group trips across India with AI-powered recommendations, curated destinations, and seamless collaboration.

---

## 🚀 Features

- 🧠 **AI Trip Planner** – Describe your ideal trip and let AI generate the itinerary
- 🗺️ **Explore Destinations** – Discover popular and offbeat Indian places
- 👥 **Collaborative Planning** – Add and manage trips with friends
- 🗓️ **Day-by-Day Itinerary** – Create, view, and update daily plans
- 🔒 **Secure Login** – Google OAuth-based authentication
- 📦 **Fast API Integration** – Uses Fastify + schema-driven routes

---

## 🌐 Live Demo

👉 [Live App Link](https://your-live-link.vercel.app)  
_(Replace with your deployed URL)_

---

## 📸 Screenshots

| Home Page | AI Planner | Itinerary View |
|-----------|------------|----------------|
| ![Home](screenshots/home.png) | ![Planner](screenshots/planner.png) | ![Itinerary](screenshots/itinerary.png) |

_Add images to a `/screenshots` folder and update the paths above._

---

## 🛠️ Tech Stack

- **Frontend:** Vite, React, TailwindCSS
- **Backend:** Node.js, Fastify, Mongoose
- **Auth:** Google OAuth via fastify-passport
- **Deployment:** Vercel (frontend), Railway/Render (backend)

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/trip-together.git
cd trip-together

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
# Add your API keys, MongoDB URI, and other secrets

# 4. Start development server
npm run dev
