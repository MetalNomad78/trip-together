import React, { useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./guideRegistration.css";
import { StoreContext } from "../../Context/StoreContext";

const GuideRegistration = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setToken, url } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    experience: "",
    rating: "",
    specialization: "",
    image: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "/api/userLogin" : "/api/userSignup";

    const payload = {
      email: formData.email,
      password: formData.password,
      ...(isLogin
        ? {}
        : {
            name: formData.username,
            experience: formData.experience,
            rating: formData.rating,
            specialization: formData.specialization,
            image: formData.image,
            bio: formData.bio,
          }),
    };

    try {
      const response = await axios.post(`${url}${endpoint}`, payload);

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success(response.data.message);
        // Optionally redirect or reset form
      } else {
        toast.error(response.data.message || "Something went wrong");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Server error. Please try again."
      );
    }
  };

  return (
    <div className="guide-registration-wrapper">
      <div className="guide-registration-container">
        <h2 className="form-title">{isLogin ? "Login" : "Sign Up as Guide"}</h2>
        <form onSubmit={handleSubmit} className="registration-form">
          {!isLogin && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Full Name"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g., 8 years)"
                value={formData.experience}
                onChange={handleChange}
              />
              <input
                type="text"
                name="rating"
                placeholder="Rating (e.g., 4.9/5 (127 reviews))"
                value={formData.rating}
                onChange={handleChange}
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization (e.g., Mountain Treks)"
                value={formData.specialization}
                onChange={handleChange}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL (e.g., /images/guide.jpg)"
                value={formData.image}
                onChange={handleChange}
              />
              <textarea
                name="bio"
                placeholder="Short Bio"
                rows="3"
                value={formData.bio}
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="toggle-form">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span onClick={() => setIsLogin(!isLogin)} className="toggle-link">
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default GuideRegistration;
